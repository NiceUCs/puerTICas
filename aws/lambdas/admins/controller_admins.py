import json
import boto3
import os
import base64
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError
import io

# environment variables
aws_region = os.environ.get('AWS_REGION')
workers_table = os.environ['WORKERS_TABLE']
registers_table = os.environ['REGISTERS_TABLE']
workers_images_bucket = os.environ['WORKERS_IMAGES_BUCKET']
workers_rekognition_collection = os.environ['WORKERS_REKOGNITION_COLLECTION']
env = os.environ['ENDPOINT']

# dnamodb resource
if env == "[object Object]":
    dynamodb = boto3.resource(
        "dynamodb",
        endpoint_url="http://localhost:8000",
        aws_access_key_id="foo",
        aws_secret_access_key="bar",
        verify=False,
    )
else:  # prod
    dynamodb = boto3.resource('dynamodb', region_name=aws_region)

# dnamodb tables
dynamodb_workers_table = dynamodb.Table(workers_table)
dybamodb_registers_table = dynamodb.Table(registers_table)

# boto3 clients
rekognition = boto3.client('rekognition', region_name=aws_region)
s3 = boto3.client('s3', region_name=aws_region)


def get_users():
    try:
        expiration = 9999
        result = dynamodb_workers_table.scan()
        response = result["Items"]
        s3_hl = boto3.resource('s3')
        bucket = s3_hl.Bucket(workers_images_bucket)
        for user in response:
            image = bucket.Object(user["email"])
            img_data = image.get().get('Body').read()
            user["data"]["image"] = base64.b64encode(img_data).decode('ascii')

        return response

    except Exception as e:
        raise HTTPError(500, 'Internal Error: %s' % e)


def create_user(data):
    try:
        item = {
            "email": data["email"],
            "data": data["data"],
        }

        # cargar string a bytes de base64
        image_source = base64.b64decode(data["data"]["image"])

        image_source_bytes = io.BytesIO(image_source)
        # obtener los bytes
        image_source_bytes = image_source_bytes.getvalue()

        # indexar face en coleccion
        response = rekognition.index_faces(
            Image={"Bytes": image_source},
            CollectionId=workers_rekognition_collection)

        # guardar id face en item de dynamodb
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            item["RekognitionId"] = response['FaceRecords'][0]['Face']['FaceId']

        # guardar imagen con key email del usuario
        s3.put_object(Body=image_source, Bucket=workers_images_bucket,
                      Key=data["email"])

        #guardar URI a s3 del object de la imagen en dynamo
        item["data"]["imageURI"] = "s3://" + workers_images_bucket + "/" + data["email"]
		# url = "https://s3.amazonaws.com/" + workers_images_bucket + + "/" + data["email"]

        # quitar imagen del item de dynamodb
        del item['data']['image']

        # escribir usuario en dynamodb
        dynamodb_workers_table.put_item(Item=item)

        response = {"Create": True, "data": item}

        return response

    except Exception as e:
        raise HTTPError(500, "Internal Error: %s" % e)


def delete_user(data):
    try:
        user = dynamodb_workers_table.get_item(Key={'email': data["email"]})

        if "Item" not in user:
            response = {"Delete": False, "data": data}

        else:
            user = user['Item']
            # borrar usuario por email
            dynamodb_workers_table.delete_item(
                Key={"email": data["email"]}
            )

            # borrar objeto con la imagen por email
            s3.delete_object(Bucket=workers_images_bucket,
                             Key=user["email"])

            rekognition.delete_faces(CollectionId=workers_rekognition_collection,
                                     FaceIds=[user["RekognitionId"]])

            response = {"Delete": True, "data": data}

        return response

    except Exception as e:
        raise HTTPError(500, "Internal Error: %s" % e)


def get_analytics():
    try:
        result = dybamodb_registers_table.scan()
        response = result["Items"]
        return response

    except Exception as e:
        raise HTTPError(500, 'Internal Error: %s' % e)
