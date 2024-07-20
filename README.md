# sls_twilio_api

# serverless-setup-wireframe
Basic serverless wireframe for a startup project

### Creating projects  
```        
# Create a serverless project inside a git repository
sls create --template aws-nodejs --path testS3
sls create --template aws-nodejs

npm init -y

npm install aws-sdk mysql @hapi/joi uuid
npm install serverless-domain-manager --save-dev
npm install serverless-add-api-key --save-dev
npm install serverless-iam-roles-per-function --save-dev
npm install serverless-plugin-log-retention

# NodeJS SDK GGV2
npm install @aws-sdk/client-greengrassv2
# Serverless GG
npm install serverless-plugin-greengrass --save-dev
```
### Debug projects
For debugging logs, run again after setting the `SLS_DEBUG=*` environment variable.  
Ex:
MAC OS
`export SLS_DEBUG=true` OR 
```
export SLS_DEBUG=*
SLS_DEBUG=* < Opperation >
SLS_DEBUG=* sls create_domain --stage devig
SLS_DEBUG=* sls deploy --stage devig
```

### Subdomains
```
sls delete_domain --satge dev-ig
sls create_domain --satge dev-ig 
```

### Deploying projects
```
sls deploy --stage dev-ig/dev-ze/dev-ub
sls deploy --aws-profile default --stage production --region us-east-1
sls deploy function -f scican --stage dev-ig
```

### Debugging projects
```
sls logs -f hello -t
sls logs --function hello --tail
sls print --stage dev-ig
SLS_DEBUG=* sls delete_domain --stage dev-ig

sls invoke local  -f hello
sls invoke local  -f cefla -d test/eventBody.json
```
### Invoke Local TEST - file is in the mocks directory.
```
sls invoke local --function scicancreatething --path mocks/create-thing.json --stage qa
sls remove --stage dev/prod/ig/ub/...
```

### [Offline Emulation](https://www.serverless.com/blog/quick-tips-for-faster-serverless-development)


## [AWS Systems Manager](https://us-east-2.console.aws.amazon.com/systems-manager/home?region=us-east-2#) -> ssm:varName.  
---
The `ssm:varName` is a reference for a variable stored in `AWS Systems Manager` where we can store passwords or logins or protected alues that we dont want make available in github. 
All variables are stored in [Parameter Store](https://us-east-2.console.aws.amazon.com/systems-manager/parameters/?region=us-east-2&tab=Table). Usage:

```
- Effect: 'Allow'
      Action:
      - 'rds:*'
      Resource: 'arn:aws:rds:${self:provider.region}:${ssm:simemap-id~true}:db:${ssm:rdsMySqlCluster-${self:provider.stage}~true}'

Note: the ~true is about to be deleted for the latest version of the serverless.
```

### Serverless.yml reference
```
# Ideally to have the same Code Repository name (GitHub or CodeCommit or ...). Use semantic names, avoid camelCase names (someServiceName). This is going to map with function name in AWS CloudWatch and will be hard during the maintenance/debug process.

service: serverless-setup-wireframe
frameworkVersion: '2'

# To install plugins run npm install
plugins:
  # * [List of Plugins - Serverless](https://github.com/serverless/plugins)

  # * [How can I remove a stack with serverless greengrass plugin?](https://tipsfordev.com/how-can-i-remove-a-stack-with-serverless-greengrass-plugin)
  # * [serverless-plugin-greengrass](https://github.com/daaru00/serverless-plugin-greengrass)
  # - serverless-plugin-greengrass

  # * [Serverless Domain Manager](https://www.serverless.com/plugins/serverless-domain-manager)
  # * [serverless-domain-manager](https://www.npmjs.com/package/serverless-domain-manager)
  # - serverless-domain-manager

  # * [serverless-iam-roles-per-function](https://github.com/functionalone/serverless-iam-roles-per-function)
  # - serverless-add-api-key

  # [Serverless Plugin Log Retention](https://www.serverless.com/plugins/serverless-plugin-log-retention)
  # [Serverless Plugin Log Retention](https://www.npmjs.com/package/serverless-plugin-log-retention)
  - serverless-plugin-log-retention

  # * [serverless-iam-roles-per-function](https://github.com/functionalone/serverless-iam-roles-per-function)
  - serverless-iam-roles-per-function

custom:
  # --- Map between the serverless service name, the Code Repository (GitHub or CodeCommit or ...) and the AWS Ideally to have the same repository name. Avoid long names, avoid dashed names (some-some-some). This is going to end up in the name function in AWS CloudWatch and will be hard during the maintenance/debug process.



  serviceDisplayName: 'slsSetupWire'
  # --- Log-retention
  logRetentionInDays: 30 # used to set a global value for all functions
  # --- Greengrass
  greengrass:
    groupId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx # Greengrass Group id
  
  # --- Functions variables names list
  fnGetUserWireFrame: 'fnGetUserWireFrame'
  fnMQTTUserWireFrame: 'fnMQTTUserWireFrame'
  fnGGWireFrame: 'fnGGWireFrame'
  # --------------------

  # --- serverless-domain-manager
  PREFIX:
    prod: ''
    production: ''
    other: '${self:provider.stage}-'
  SUFFIX:
    prod: ''
    production: ''
    other: '-${self:provider.stage}'

  #! Append stage name to domainName e.g iot-dev. No suffix if stage is production/prod.
  #! To CREATE domain run: serverless create_domain --stage stageName.
  #! To DELETE domain run: serverless delete_domain --stage stageName
  customDomain:
    domainName: iot${self:custom.SUFFIX.${self:provider.stage}, self:custom.SUFFIX.other}.scicanapi.com
    basePath: 'thing'
    stage: ${self:provider.stage}
    createRoute53Record: true
  apiKeys:
  - name: ${file(env.yml):SCICAN_RND_KEY_NAME_${self:provider.stage}}
    value: ${file(env.yml):SCICAN_RND_KEY_VALUE_${self:provider.stage}}
    usagePlan:
      name: "usageplan-${file(env.yml):SCICAN_RND_KEY_NAME_${self:provider.stage}}"
      quota:
        limit: 100000
        period: DAY
      throttle:
        burstLimit: 100
        rateLimit: 20
  - name: ${file(env.yml):SCICAN_KEY_NAME_${self:provider.stage}}
    value: ${file(env.yml):SCICAN_KEY_VALUE_${self:provider.stage}}
    usagePlan:
      name: "usageplan-${file(env.yml):SCICAN_KEY_NAME_${self:provider.stage}}"
      quota:
        limit: 1000
        period: DAY
      throttle:
        burstLimit: 100
        rateLimit: 20
  - name: ${file(env.yml):CEFLA_KEY_NAME_${self:provider.stage}}
    value: ${file(env.yml):CEFLA_KEY_VALUE_${self:provider.stage}}
    usagePlan:
      name: "usageplan-${file(env.yml):CEFLA_KEY_NAME_${self:provider.stage}}"
      quota:
        limit: 1000
        period: DAY
      throttle:
        burstLimit: 100
        rateLimit: 20
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  stage: ${opt:stage, 'dev'}
  region: ${file(env.yml):${self:provider.stage}.region}
  versionFunctions: false


  # iamManagedPolicies:
  # - "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    # resourcePolicy:
    #   - Effect: Allow
    #     Principal: '*'
    #     Action: execute-api:Invoke
    #     Resource:
    #       - "arn:aws:execute-api:${file(env.yml):${self:provider.stage}.region}:${ssm:scican-id~true}:lm3pu9q1ag/${self:provider.stage}/POST/${file(env.yml):SCICAN_COMPANY_NAME}/things"
    #     Condition:
    #       IpAddress:
    #         aws:SourceIp:
    #           - '69.17.128.238'
    #           - '54.149.160.209'
    #           - '74.65.0.83'
    #           - '99.228.248.94'

    #apiKeys:
    #  - name: ${self:service}-${file(env.yml):SCICAN_KEY_NAME_${self:provider.stage}}
    #    value: ${self:service}-${file(env.yml):SCICAN_KEY_VALUE_${self:provider.stage}}
    #  - name: ${self:service}-${file(env.yml):CEFLA_KEY_NAME_${self:provider.stage}}
    #    value: ${self:service}-${file(env.yml):CEFLA_KEY_VALUE_${self:provider.stage}}

    # - free:
    #   - ${self:provider.stage}-clientOne
    #   - ${self:provider.stage}-clientTwo
    #   - ${self:provider.stage}-${file(env.yml):CEFLA_COMPANY_NAME}
    #   - ${self:provider.stage}-${file(env.yml):SCICAN_COMPANY_NAME}
    # - paid:
  #   - ${self:provider.stage}-clientFour

  # usagePlan:
  #   quota:
  #     limit: 10
  #     offset: 0
  #     period: DAY
  #   throttle:
  #     burstLimit: 1
  #     rateLimit: 1
  # - free:
  #   quota:
  #     limit: 10
  #     offset: 5
  #     period: DAY
  #   throttle:
  #     burstLimit: 1
  #     rateLimit: 1
  # - paid:
  #   quota:
  #     limit: 5000
  #     offset: 0
  #     period: MONTH
  #   throttle:
  #     burstLimit: 1
  #     rateLimit: 1

functions:
  
  fnTestGG:
    name: ${self:provider.stage}-${self:service}-${self:custom.fnTestGG}
    handler: fnTestGG.fnTestGG
    greengrass:
      handler: tasks/door.handlerIot # override handler for Greengrass deployed function
      pinned: true # override default values
      environment: 
        myVarC: 'myValueC' # deployed to Greengrass only for this function

  fnWireFrame:
    # This is the name of the function that will be displayed in the AWS Lambda/CloudWatch dashboard. Ex: dev-slsSetupWire-fnWireFrame. It shows the Environment, the Repository Name and the File.js/Function Name.  
    name: ${self:provider.stage}-${self:custom:serviceDisplayName}-${self:custom.fnWireFrame} 
    handler: src/functions/fnWireFrame.fnWireFrame
    events:
    - http:
        path: promocodes/
        method: GET
        private: false
    - http:
        path: promocodes/{token}/lv2/
        method: GET
        private: false
    - http:
        path: promocodes/{token}/lv2/{df}
        method: GET
        private: false
        request:
            parameters:
              querystrings:
                dt_start: false
                dt_end: false
              paths:
                token: true
                df: true
    memorySize: 256
    timeout: 30
    logRetentionInDays: 10 # Set or override the retention for specific log group or function
    iamRoleStatementsName: ${self:custom.fnGetPromocode}-${self:provider.stage}
    iamRoleStatements:
    - Effect: 'Allow'
      Action:
      - 'rds:*'
      Resource: 'arn:aws:rds:${self:provider.region}:${ssm:scican-id~true}:db:${ssm:rdsMySqlCluster-${self:provider.stage}~true}'
    - Effect: 'Allow'
      Action:
      - 'logs:CreateLogGroup'
      - 'logs:CreateLogStream'
      - 'logs:PutLogEvents'
      - 'ec2:CreateNetworkInterface'
      - 'ec2:DescribeNetworkInterfaces'
      - 'ec2:DeleteNetworkInterfaces'
      Resource: "*"
    vpc: ${file(env.yml):vpc-${self:provider.stage}}
    environment:
      mqttTopicEnv: ${file(env.yml):${self:provider.stage}.mqttTopicEnv}
      rdsMySqlDb: ${ssm:rdsMySqlDb-${self:provider.stage}~true}
      rdsMySqlHost: ${ssm:rdsMySqlHost-${self:provider.stage}~true}
      rdsMySqlUsername: ${ssm:rdsMySqlUsername-${self:provider.stage}~true}
      rdsMySqlPassword: ${ssm:rdsMySqlPassword-${self:provider.stage}~true}


  fnGetUserWireFrame: ${file(src/fnsUserWireFrame/serverless.yml):fnGetUserWireFrame}   
  fnMQTTUserWireFrame: ${file(src/fnsUserWireFrame/serverless.yml):fnMQTTUserWireFrame}   


  fnGGWireFrame: ${file(src/fnGGWireFrame/serverless.yml):fnGGWireFrame}    
```

