import json
import logging
import os
import time
import uuid
from tools.decimalencoder import DecimalEncoder
import boto3

from lambdas.admins.admins_controller import (
    get_users,
    create_user,
    delete_user,
    get_analytics,
)


def h_get_users(event, context):

    response = {
        "headers": {"Access-Control-Allow-Origin": "*"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None

        data = event["body"] if "body" in event else None
        data = json.loads(data) if data else None

        result = get_users()

        response.update({"body": json.dumps(result, cls=DecimalEncoder)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response


def h_delete_user(event, context):

    response = {
        "headers": {"Access-Control-Allow-Origin": "*"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None

        data = event["pathParameters"] if "pathParameters" in event else None

        result = delete_user(data)

        response.update({"body": json.dumps(result, cls=DecimalEncoder)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response

def h_create_user(event, context):
    
    response = {
        "headers": {"Access-Control-Allow-Origin": "*"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None

        data = event["body"] if "body" in event else None
        data = json.loads(data) if data else None

        result = create_user(data)

        response.update({"body": json.dumps(result, cls=DecimalEncoder)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response

def h_get_analytics(event, context):

    response = {
        "headers": {"Access-Control-Allow-Origin": "*"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None

        data = event["body"] if "body" in event else None
        data = json.loads(data) if data else None

        result = get_analytics()

        response.update({"body": json.dumps(result, cls=DecimalEncoder)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response
