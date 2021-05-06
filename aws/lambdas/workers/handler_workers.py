import json
import logging
import os
import time
import uuid
from tools.decimalencoder import DecimalEncoder
import boto3

from lambdas.workers.workers_controller import (
    identify,
)


def h_identify(event, context):

    response = {
        "headers": {"Access-Control-Allow-Origin": "*"},
        "statusCode": 200,
        "body": None,
    }

    try:
        headers = event["headers"] if "headers" in event else None

        data = event["body"] if "body" in event else None
        data = json.loads(data) if data else None

        result = identify(data)

        response.update({"body": json.dumps(result, cls=DecimalEncoder)})

    except Exception as e:
        print("> Error: %s" % e)
        response.update({"statusCode": 500, "body": "Internal Error: %s" % e})

    return response
