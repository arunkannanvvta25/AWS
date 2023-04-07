const AWS = require('aws-sdk');
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

 exports.handler = async (event, context, callback) => {

    AWS.config.update({
        region:  "us-east-2",
    });

    let putRequest = {
        TableName: 'FileTable',
        Item: {
            "id": event.body.id,
            "input_file":event.body.input_file,
            "input_text":event.body.input_text
        }
    };

    await dynamodbClient.put(putRequest).promise()
    .then((data) => {
        console.info('successfully update to dynamodb', data)
    })
    .catch((err) => {
        console.info('failed adding data dynamodb', err)
    });

};