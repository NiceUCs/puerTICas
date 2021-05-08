import json
import boto3
import os
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key
from tools.http_error import HTTPError

import json
import base64

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

	s3 = boto3.client('s3', region_name = aws_region)
	rekognition = boto3.client('rekognition', region_name = aws_region)
        
	allowed = False
	response = {}

    try:
		imagesInBucket = s3.list_objects_v2(
			Bucket = workers_images_bucket
		)
		keys = [obj['Key'] for obj in imagesInBucket['Contents']]

		objSource = json.loads(data['Body'].read().decode('utf-8'))
		imageSourceB64 = objSource['image']
		imageSource = base64.b64decode(imageSourceB64)

		for key in keys:
			obj = s3.get_object(Bucket=workers_images_bucket, Key=key)
			objBody = json.loads(obj['Body'].read().decode('utf-8'))
			# imageTargetB64 = objBody['image']
			imageTarget = base64.b64decode(objBody['image'])
			emailTarget = objBody['email']

			faces_comparison = rekognition.compare_faces(
				SimilarityThreshold = 90,
        		# SourceImage = {'Bytes': imageSource.read()},
        		SourceImage = {'Bytes': imageSource},
        		TargetImage={'Bytes': imageTarget}
    		)

			if(len(faces_comparison['FacesMatches'])):
				allowed = True
				break

		# response = accessAllow(allowed)

		""" # result = REKOGNITION->BUSCAR IMAGEN DE S3->QUE DEVUELVA EL DYNAMODB ASIGNADO A PARTIR DE LA URL DE S3 O ALGO ASI
        result = dybamodb_workers_table.query(
            KeyConditionExpression=Key("email").eq(data["email"]))
        # response authorized: True / False
        response["Authorized"]=False
        response = result["Items"][0]
		"""

		if(allow):
			result = dybamodb_workers_table.get_item(
				Key={
					'email': emailTarget
				}
			)
			response['Authorized'] = True
			response['User'] = result['Item']
		else:
			response['Authorized'] = False

        return response 

    except Exception as e:
        raise HTTPError(500, 'Internal Error: %s' % e)


""" def accessAllow(allow: bool):
	response = {}

	if(allow):
		result = dybamodb_workers_table.get_item(
			Key={
				'email': emailTarget
			}
		)
		response['Authorized'] = True
		response['User'] = result['Item']
	else:
		response['Authorized'] = False
	
	return(response) """
		