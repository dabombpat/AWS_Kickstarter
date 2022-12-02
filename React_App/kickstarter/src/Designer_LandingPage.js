import React from "react";
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";



function Designer_LandingPage(){
  const navigate = useNavigate();
  let username = currentuser.user;

  console.log("Looking for projects with username :", username);
  DevlisterCaller(username);


  function DevlisterCaller(username) {
    var form = document.addForm;
  
    // my actual payload for arg1/arg2
    var data = {};
    data["username"] = username;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("GET", devlister_url, true);

    console.log('payload! :', js)

    xhr.send(js);

    console.log('Asking Lambda for Projects by this user')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('received a status from lambda function')

      var responseunit = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", js)

      var result  = responseunit["result"];

      console.log("response projects are : ", result);
      //processAddResponse(xhr.responseText);
    } else {
      //processAddResponse("N/A");
    }

  };
  }


  var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";

  var devlister_url = base_url + "devlister";      // POST: {arg1:5, arg2:7}

  function Create_Project(){
  
    console.log("Create Project!")
    navigate('/create_project');



    
  }
  
    return (
        <div>
      
          <h1><center>Welcome to the Designer Landing Page!</center></h1>
          <h1><center>You've Logged in!</center></h1>

          <br/>
          <h5><center>I need to put a list of projects here</center></h5>

          <center><button onClick={Create_Project}>Create A Project</button></center>

          </div>

          
        );
    }


export default Designer_LandingPage;