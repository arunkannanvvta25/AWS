'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region:"us-east-2"})

exports.handler = async function (event, context, callback) {
    const ddb= new AWS.DynamoDB({apiVersion:"2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region:"us-east-2"});
    
    
const params = {
  TableName: 'FileTable',
  Key: {
    id:"12345"
  }
};

try{
  const data = await documentClient.get(params).promise();
  console.log(data);
}
catch(err){
  console.log(err);
}

// Call DynamoDB to retrieve the item
// ddb.getItem(params, (err, data) => {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Success', data.Item);
//   }
// });
}
