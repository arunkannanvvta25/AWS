import React from "react";
import './App.css';
//import dotenv from 'dotenv'
import AWS from 'aws-sdk'

//dotenv.config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { change: true };
  }

handleClick = async () => {  
  const file = document.querySelector("#fileInput").files[0]
  const fileName= file.name;  

  AWS.config.region = 'us-east-2';  
  const bucketName = 'fovus-file-upload';
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY  
  AWS.config.credentials = new AWS.Credentials(accessKeyId, secretAccessKey);
  
  const s3 = new AWS.S3();
  const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: fileName,
        ContentType: 'application/octet-stream'
      }, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
    console.log(url)

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    })
}

  render() {
    return (
      <div className="App">
      <div className="fileUploadDiv">
      <label className="Inputlabel">Text Input:</label>
      <input type="text" id="fileName"></input>
      <br></br>
      <label className="Inputlabel">File Input:</label>
      <input id="fileInput" type="file" ></input>
      <br></br>
      <button onClick={this.handleClick}>Upload</button>
    </div>
    </div>
    );
  }
}

export default App;