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
workers_table_gsi = os.environ['WORKERS_TABLE_GSI']
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
dynamodb_registers_table = dynamodb.Table(registers_table)

# boto3 clients
s3 = boto3.client('s3', region_name=aws_region)
rekognition = boto3.client('rekognition', region_name=aws_region)


def identify(data):
    try:
        allowed = False
        response = {}

        # cargar string de imagen
        imageSource = data["image"]
        # cargar en base64 y convertir a bytes
        imageSource = io.BytesIO(base64.b64decode(imageSource))
        # obtener los bytes
        imageSource = imageSource.getvalue()

        response = rekognition.search_faces_by_image(
            CollectionId=workers_rekognition_collection,
            Image={'Bytes': imageSource}
        )

        for match in response['FaceMatches']:
            print(match['Face']['FaceId'], match['Face']['Confidence'])
          #  result = dynamodb_workers_table.get_item(
            #    Key={'RekognitionId': {'S': match['Face']['FaceId']}}
            # )
            result = dynamodb_workers_table.query(
                IndexName=workers_table_gsi,
                KeyConditionExpression=Key('RekognitionId').eq(
                    match['Face']['FaceId']),
            )
            print(result)
            if 'Items' in result and len(result['Items']) > 0:
                allowed = True
                break

        if allowed:
            user = result['Items'][0]
            response['Authorized'] = True
            response['User'] = user
            # guardar registro de acceso en tabla registers
            item = {
                "email": user["email"],
                "data": user["data"],
                "dateCreation": str(datetime.utcnow().isoformat()),
            }
            dynamodb_registers_table.put_item(Item=item)
        else:
            response['Authorized'] = False

        return response

    except Exception as e:
        raise HTTPError(500, "Internal Error: %s" % e)
