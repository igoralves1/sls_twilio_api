# Local Dynamodb Docker

Installation 

Steps : 


1. Setting Up AWS credentials & Installing Docker + Compose


1. /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. brew install awscli
   # ignore this step if aws is already configured
3. aws configure (You will be prompted to enter your AWS Access Key ID, Secret Access Key, default region, and output format)
   AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
   AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
   Default region name [None]: YOUR_REGION
   Default output format [None]: json


   
   # install docker - Use docker Desktop (Docker.dmg) it will install docker and compose
4. brew install docker compose
5. brew install docker
<!-- 6. brew install colima -->
<!-- 7. colima start -->
8. docker ps -a




9. Clone the repo

```
git clone https://github.com/igoralves1/sls_twilio_api.git
```

3. Checkout to dynamo_local branch

```
git checkout dynamo_local
```



4. Installed Required Packages for the serverless prj
```
npm install
```

5. Run the serverless offline 

```
sls offline start
```

6. In `another terminal` run start docker - Run the Dynamo locally (docker compose up)

```
docker compose up
```

Dynamo Local 

1. Install dynamodb-admin
   
```
npm install -g dynamodb-admin
```

2. Use:
   
Open a new terminal window, and execute 
```
dynamodb-admin
```

Go to URL: `localhost:8001`

3. Create a new item in a table with GUI

put picture


4. Create Table From `AWS CLI` for test: 
   
```
aws dynamodb create-table     --table-name posts-table-dev     --attribute-definitions         AttributeName=postId,AttributeType=S     --key-schema         AttributeName=postId,KeyType=HASH     --provisioned-throughput         ReadCapacityUnits=1,WriteCapacityUnits=1    --endpoint-url http://localhost:8000
```

5. Delete Table From CLI 

```
aws dynamodb delete-table     --table-name posts-table-dev     --endpoint-url http://localhost:8000
```

6. List Tables 

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

7. Curl Commands

GET

```
curl -X GET http://localhost:3000/dev/post/12
```

POST
```
curl -X POST 'http://localhost:3000/dev/post' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{"postId": "12"}'


Body : 
{
  "postId": "12"
}
```

Extension Used in VSCode if you don't have POSTMAN

`ThunderClient`





