
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="fileUploadDiv">
      <lable className="InputLable">Text Input:</lable>
      <input type="text"></input>
      <br></br>
      <lable className="InputLable">File Input:</lable>
      <input id="fileInput" type="file" ></input>
      <br></br>
      <button type="submit">Upload</button>
    </div>
    </div>
  );
}

export default App;
