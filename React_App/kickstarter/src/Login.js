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
    //console.log(js);
    xhr.send(js);

    console.log('Sent Email and Password to Lambda')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('received a status from lambda function')
      console.log("response text : ", xhr.responseText);
      let status = 
      processAddResponse(xhr.responseText);
    } else {
      processAddResponse("N/A");
    }

  };
  }





  /**
   * Respond to server JSON object.
   *
   */
  function processAddResponse(result) {
    // Can grab any DIV or SPAN HTML element and can then manipulate its
    // contents dynamically via javascript
    //console.log("PAR Result :", result)

    var js = JSON.parse(result);
    //console.log("JSONParse Result :", js)
    var status  = js["statusCode"];

    console.log("found status : ", status)

    
    // Update computation result
    if (status == 200) {
      console.log("Switch Page!")
      //document.addForm.result.value = result;

      navigate('/landing');
    } else {
      console.log("Incorrect username or password")
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

}

export default Login;
