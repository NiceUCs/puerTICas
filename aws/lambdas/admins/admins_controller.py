import json
import boto3
import os
import base64
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError

# environment variables
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
dybamodb_registers_table = dynamodb.Table(registers_table)

# boto3 clients
rekognition = boto3.client('rekognition', region_name=aws_region)
s3 = boto3.client('s3', region_name=aws_region)


def get_users():
    try:
        result = dynamodb_workers_table.scan()
        response = result["Items"]
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
        imageSource = base64.b64decode(data["data"]["image"])

        # guardar imagen con key email del usuario
        s3.put_object(Body=imageSource, Bucket=workers_images_bucket,
                      Key=data["email"])

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
        # borrar usuario por email
        dynamodb_workers_table.delete_item(
            Key={"email": data["email"]}
        )

        # borrar objeto con la imagen por email
        s3.delete_object(Bucket=workers_images_bucket, Key=data["email"])

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
