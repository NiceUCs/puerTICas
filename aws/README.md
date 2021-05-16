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
