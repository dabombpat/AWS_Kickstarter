import './App.css';
import React from 'react';
import currentuser from './App';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';


// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";

var login_url = base_url + "login";      // Register URL
var register_url = base_url + "register";      // Register URL



function Login() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function handleSubmit(){
  }

  function Handle_Login() {
    alert('Attempting to Login');
    console.log("username : ", email)
    console.log("password : ", password)
    if(email == "admin" && password == "admin"){
      console.log("Admin!")
      console.log("Navigating to Admin Landing Page! ---------------------")
      currentuser.user = email;
      currentuser.type = "Admin";
      navigate('/Admin_LandingPage');
    }
    SendtoALambda(email, password, "L", "");
  }

  function Handle_Register_Designer() {
    alert('Attempting to Register Designer');
    //event.preventDefault();
    console.log("username : ", email)
    console.log("password : ", password)
    SendtoALambda(email, password, "R", "Designer");
  }

  function Handle_Register_Supporter() {
    alert('Attempting to Register Supporter');
    //event.preventDefault();
    //console.log("username : ", email)
    //console.log("password : ", password)
    SendtoALambda(email, password, "R", "Supporter");
  }

  function SendtoALambda(email, password, LorR, role) {
    // creating payload
    var data = {};
    data["username"] = email;
    data["password"] = password;
    data["role"] = role;

    
    // wrapping payload inside body
    var body = {}
    body["body"] = JSON.stringify(data); // ------------- Stringifying Data
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    if(LorR == "L"){
      xhr.open("POST", login_url, true);
    }
    if(LorR == "R"){
      xhr.open("POST", register_url, true);
    }

    //console.log(js);
    xhr.send(js);
    console.log('Sent Data to Lambda') // ------------- Sent Data to Lambda
    
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('Received Response from Lambda') // ------------- Received Response From Lambda
      currentuser.user = email;
      console.log(role)
      console.log(email)
      //currentuser.type = "Designer";
      if(LorR == "L"){
        processResponse(xhr.responseText);
      }
    } else {
      processResponse("N/A");
    }

  };
  }


  function processResponse(result) {
    var js = JSON.parse(result); // Parsing response from Lambda
    var status  = js["statusCode"];
    var DesignerorSupporter  = js["body"];
    //console.log(body)
    currentuser.type = DesignerorSupporter;

    if (status == 200) {
      console.log("Correct Username and Password!")

      if(currentuser.type == "Designer"){
      console.log("Navigating to Designer Landing Page! ---------------------")
      navigate('/Designer_LandingPage');
      }

      if(currentuser.type == "Supporter"){
        currentuser.user = email;
        console.log("Navigating to Supporter Landing Page! ---------------------")
        navigate('/Supporter_LandingPage');
        }
      
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

    <center><br/><button onClick={Handle_Login}>Log In</button></center>
    <center><br/><button onClick={Handle_Register_Designer}>Register Designer</button></center>
    <center><button onClick={Handle_Register_Supporter}>Register Supporter</button></center>

    </div>
  );

}

export default Login;
