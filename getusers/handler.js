const aws = require('aws-sdk');

let dynamoDBClientParams = {}

if(process.env.IS_OFFLINE){
    dynamoDBClientParams = {        
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'AKIAXGH43JHE3W4X7ZOO',  // needed if you don't have aws credentials at all in env
        secretAccessKey: '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' 
   }   
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const getUsers = async (event, context) => {
    
    let userId = event.pathParameters.id

    var params = {
        ExpressionAttributeValues: {':pk':userId},
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
      };
    const res = await dynamodb.query(params).promise()

    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'user': res })
    }

}

module.exports = {
    getUsers
}
