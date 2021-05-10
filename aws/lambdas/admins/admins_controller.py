import json
import boto3
import os
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError

aws_region = os.environ.get('AWS_REGION')
workers_table = os.environ['WORKERS_TABLE']
registers_table = os.environ['REGISTERS_TABLE']
workers_images_bucket = os.environ['WORKERS_IMAGES_BUCKET']
env = os.environ['ENDPOINT']

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

dybamodb_workers_table = dynamodb.Table(workers_table)
dybamodb_registers_table = dynamodb.Table(registers_table)


def get_users():
    try:
        result = dybamodb_workers_table.scan()
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

        # write the user to the database
        dybamodb_workers_table.put_item(Item=item)

        response = {"Create": True, "data": item}
        return response

    except Exception as e:
        raise HTTPError(500, "Internal Error: %s" % e)


def delete_user(data):
    try:
        # delete the user from the database
        dybamodb_workers_table.delete_item(
            Key={"email": data["email"]}
        )
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
