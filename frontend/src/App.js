import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { change: true };
  }
  
  handleClick = async () => {
    const fileInput = document.querySelector("#fileInput")
    const file = fileInput.files[0]
    const fileName= file.name
  // get secure url from our server
  const { url } = await fetch("http://localhost:8080/s3url", {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({  "fileName":fileName  })
  }).then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  const imageUrl = url.split('?')[0]
  console.log(imageUrl)

  // post requst to my server to store any extra data
  
  
  
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