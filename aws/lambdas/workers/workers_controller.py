import json
import boto3
import os
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError

aws_region = os.environ.get('AWS_REGION')
workers_table = os.environ['WORKERS_TABLE']
workers_images_bucket = os.environ['WORKERS_IMAGES_BUCKET']

if local in os.environ:
    dynamodb = boto3.resource(
        "dynamodb",
        endpoint_url="http://localhost:8000",
        aws_access_key_id="foo",
        aws_secret_access_key="bar",
        verify=False,
    )
else:
    dynamodb_resource = boto3.resource('dynamodb', region_name=aws_region)

dynamodb_resource = boto3.resource('dynamodb', region_name=aws_region)
dybamodb_workers_table = dynamodb_resource.Table(workers_table)

def identify(data):
    try:
        # result = REKOGNITION->BUSCAR IMAGEN DE S3->QUE DEVUELVA EL DYNAMODB ASIGNADO A PARTIR DE LA URL DE S3 O ALGO ASI
        result = dybamodb_workers_table.query(
            KeyConditionExpression=Key("email").eq(data["email"]))
        # response authorized: True / False
        response["Authorized"]=False
        response = result["Items"][0]
        return response

    except Exception as e:
        raise HTTPError(500, 'Internal Error: %s' % e)
