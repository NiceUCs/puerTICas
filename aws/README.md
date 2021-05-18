# Serverless

Instalar serverless global:

```npm install -g serverless```

Instalar serverless y dynamodb local:

```npm install --save serverless-offline```

```npm install --save serverless-dynamodb-local```

Usar plugin:

```sls dynamodb install```

Borrar stack:

```sls dynamodb remove```

Arrancar local:

```sls offline start```

Con seeds:

```sls offline start --seed=domain```

Desplegar en AWS:

```sls deploy```

o

```sls deploy --aws-profile educate```

Recuerda haber configurado los credenciales de AWS antes del despliegue

# Rekognition

### Para inicializar la colección de Rekognition hay que ejecutar:
```
import boto3
rekognition = boto3.client('rekognition', region_name="us-east-1")
response=rekognition.create_collection(CollectionId="workers")
print('Collection ARN: ' + response['CollectionArn'])
```

### Para borrar la colección:
```
response=rekognition.delete_collection(CollectionId="workers")
```
