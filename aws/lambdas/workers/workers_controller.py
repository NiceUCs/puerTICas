import json
import boto3
import os
import base64
import io
from datetime import datetime
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError

# Environment variables
aws_region = os.environ.get('AWS_REGION')
workers_table = os.environ['WORKERS_TABLE']
registers_table = os.environ['REGISTERS_TABLE']
workers_images_bucket = os.environ['WORKERS_IMAGES_BUCKET']
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
dynamodb_registers_table = dynamodb.Table(registers_table)

# boto3 clients
s3 = boto3.client('s3', region_name=aws_region)
rekognition = boto3.client('rekognition', region_name=aws_region)


def identify(data):
    try:
        allowed = False
        response = {}
        # obtener objetos de s3
        imagesInBucket = s3.list_objects_v2(
            Bucket=workers_images_bucket
        )
        keys = [obj['Key'] for obj in imagesInBucket['Contents']]
        # cargar string de imagen
        imageSource = data["image"]
        # cargar en base64 y convertir a bytes
        imageSource = io.BytesIO(base64.b64decode(imageSource))
        # obtener los bytes
        imageSource = imageSource.getvalue()

        for key in keys:
            obj = s3.get_object(Bucket=workers_images_bucket, Key=key)
            # leer imagen de base64
            imageTarget = base64.b64encode(obj['Body'].read())
            # pasar base64 a bytes
            imageTarget = base64.b64decode(imageTarget)
            # obtener los bytes
            imageTarget = io.BytesIO(imageTarget)
            imageTarget = imageTarget.getvalue()
            # obtener email de la clave del objeto
            emailTarget = key
            # comparar imagenes
            faces_comparison = rekognition.compare_faces(
                SimilarityThreshold=90,
                SourceImage={'Bytes': imageSource},
                TargetImage={'Bytes': imageTarget}
            )
            # si coinciden permitir acceso
            if "FaceMatches" in faces_comparison \
                and len(faces_comparison["FaceMatches"]) > 0 \
                    and faces_comparison["FaceMatches"][0]["Similarity"] > 90:
                allowed = True
                break
        # obtener usuario por email
        result = dynamodb_workers_table.get_item(
            Key={
                'email': emailTarget
            }
        )
        if allowed and 'Item' in result:
            response['Authorized'] = True
            response['User'] = result['Item']
            # guardar registro de acceso en tabla registers
            item = {
                "email": emailTarget,
                "data": result['Item']["data"],
                "dateCreation": str(datetime.utcnow().isoformat()),
            }
            dynamodb_registers_table.put_item(Item=item)
        else:
            response['Authorized'] = False

        return response

    except Exception as e:
        raise HTTPError(500, "Internal Error: %s" % e)
