Instalar serverless global:

```npm install -g serverless```

Instalar serverless y dynamodb local:

```npm install --save serverless-offline```

```npm install --save serverless-dynamodb-local```

Usar plugin:

```sls dynamodb install```

Migracion:

```sls dynamodb start --migrate```

(Borrar):

```sls dynamodb remove```

Arrancar:

```serverless offline start```

Con seeds:

```serverless offline start --seed=domain```

Default config:
```custom:
  dynamodb:
  # If you only want to use DynamoDB Local in some stages, declare them here
    stages:
      - dev
    start:
      port: 8000
      inMemory: true
      heapInitial: 200m
      heapMax: 1g
      migrate: true
      seed: true
      convertEmptyValues: true
    # Uncomment only if you already have a DynamoDB running locally
    # noStart: true
```

Tabla:
```
resources:
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: usersTable
        AttributeDefinitions:
          - AttributeName: email
            AttributeType: S
        KeySchema:
          - AttributeName: email
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

Desplegar

```sls deploy --aws-profile educate```