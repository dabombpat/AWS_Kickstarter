import './App.css';
import React from 'react';
import App from './App';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod";

var add_url = base_url + "login";      // POST: {arg1:5, arg2:7}






function Login() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function handleSubmit(){
    console.log("worthless function")
  }

  function Handle_Login(){
    console.log("Attempting to Log In")
    Handle_Submit("L");
  }
  function Handle_Register(){
    console.log("Attempting to Register")
    Handle_Submit("R");
  }

  function Handle_Submit(LorR) {
    alert('Attempting to Login or Register');
    //event.preventDefault();
    console.log(email)
    console.log(password)
    console.log(LorR)
    //TODO: check DB for credentials
    SendtoALambda(email, password, LorR);
  }

  function SendtoALambda(email, password, LorR) {
    var form = document.addForm;
    var arg1 = email;
    var arg2 = password;
    var arg3 = LorR;
  
    // my actual payload for arg1/arg2
    var data = {};
    data["arg1"] = arg1;
    data["arg2"] = arg2;
    data["arg3"] = arg3;
    
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
    if (status == 205) {
      console.log("Switch Page!")
      //document.addForm.result.value = result;

      navigate('/designer_landing');
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
      {/* <input type="submit" value="Submit" /> */}
      
    </form></center>

    <center><button onClick={Handle_Login}>Log In</button></center>
    <center><button onClick={Handle_Register}>Register</button></center>

    </div>
  );

}

export default Login;
