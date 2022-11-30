import './App.css';
import React from 'react';
import App from './App';

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://nv069k0pjd.execute-api.us-east-1.amazonaws.com/Prod/";

var add_url = base_url + "hello";      // POST: {arg1:5, arg2:7}




function Login() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


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
