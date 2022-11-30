import './App.css';
import React from 'react';
import App from './App';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://nv069k0pjd.execute-api.us-east-1.amazonaws.com/Prod/";

var add_url = base_url + "hello";      // POST: {arg1:5, arg2:7}

const Submitbutton = {
  position: "absolute",
  left: 500,
  top: 250,
}



function Login() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
    console.log(email)
    console.log(password)
    //TODO: check DB for credentials
    SendtoALambda(email, password);
  }

  function SendtoALambda(email, password) {
    var form = document.addForm;
    var arg1 = email;
    var arg2 = password;
  
    // my actual payload for arg1/arg2
    var data = {};
    data["arg1"] = arg1;
    data["arg2"] = arg2;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", add_url, true);
  
    // send the collected data as JSON
    console.log(js);
    xhr.send(js);

    console.log('Sent Email and Password to Lambda')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('received 200 status from lambda function')
      processAddResponse(xhr.responseText, xhr.status);
      console.log("redirecting")
      navigate('/landing');
    } else {
      processAddResponse("N/A", xhr.status);
    }

  };
  }





  /**
   * Respond to server JSON object.
   *
   */
  function processAddResponse(result, status) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    console.log(result)
    console.log(status)
    
    var js = JSON.parse(result);
    var result  = js["result"];

    console.log(result)

    
    // Update computation result
    if (status == 200) {
      console.log("Switch Page!")
      //document.addForm.result.value = result;
      App.PageNum = 2
    } else {
      var msg = js["error"];   // only exists if error...
      document.addForm.result.value = "error:" + msg
    }
  }












  return (
  <div>

    <h1><center>Welcome to Kickstarter!</center></h1>
    <h1><center>Login or Register Here</center></h1>

    <center><form onSubmit={handleSubmit}>
    <br/>
    
    <label>
        Username:
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <br/>
      <label>
        Password:
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <br/>
      <input type="submit" value="Submit" />
      
    </form></center>

    </div>
  );
  // <button style={Submitbutton} onClick={() => {SubmitButtonClicked()}}>&#9650;</button>

}

export default Login;
