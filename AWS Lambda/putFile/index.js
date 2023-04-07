const AWS = require('aws-sdk');
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

 exports.handler = async (event, context, callback) => {

    AWS.config.update({
        region:  "us-east-2",
    });
    let resonseBody="";
    let statusCode=0;
    const {id,input_file,input_text} = JSON.parse(event.body)
    let putRequest = {
        TableName: 'FileTable',
        Item: {
            "id": id,
            "input_file":input_file,
            "input_text":input_text
        }
    };
    
    await dynamodbClient.put(putRequest).promise()
    .then((data) => {
        resonseBody=JSON.stringify(data);
        statusCode=201;
    })
    .catch((err) => {
        resonseBody="Failed "+err;
        statusCode=403;
    });
    
    const response= {
  statusCode: statusCode,
  header:{
    'myheader':"test"
  },
  body:resonseBody
}
return response;

};