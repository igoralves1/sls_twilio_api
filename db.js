const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: "ap-south-1",
  accessKeyId: "access_key_id",
  secretAccessKeyId: "secret_access_key_id",
  endpoint: "http://localhost:8000",
});

module.exports = client;
