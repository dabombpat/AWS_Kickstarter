import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
export


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var devlister_url = base_url + "devlister";      // POST: {arg1:5, arg2:7}
let initialprojectlist = [];
let flag = false;



function Designer_LandingPage(){
  const [listofprojects, setList] = useState(initialprojectlist);
  const navigate = useNavigate();
  let username = currentuser.user;
  DevlisterCaller(username);

  function DevlisterCaller(username) { // Requests List of Projects by the logged in Designer
    console.log(flag)
    if(flag == false){
    // Creating Lambda Payload
    var data = {};
    data["username"] = username;
    
    // Wrapping Payload in a "Body"
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", devlister_url, true);

    console.log('Asking Lambda for Projects by user : ', username)
    xhr.send(js);
  
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
    
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('Received Data from Lambda')

      var responseunit = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", responseunit)
      var result  = responseunit["body"];
      console.log("result : ", result)
      flag = true;
      if(result != undefined){
        setList(listofprojects => [result[0]["username"], result[0]["type"], result[0]["story"], result[0]["name"], result[0]["launched"], result[0]["goal"], result[0]["funds"], result[0]["deadline"],])
        console.log("result [0]", result[0]["type"])
      console.log(listofprojects)
    }

    } else {
      console.log("did not receive projects back")
    }
  }
  };
  }





  function Create_Project(){
    flag = false;
    console.log("Navigating to Create A Project Page! ---------------------")
    navigate('/create_project');
  }

    
  const handleBackToLogin  = () => {
    flag = false;
    console.log("Navigating back to the Login Page (from DLP page) ---------------------")
    navigate('/');
  }

  const handleToProject  = () => {
    flag = false;
    console.log("Navigating to Project Page (from DLP page) ---------------------")
    navigate('/project_page');
  }

  function resetflag(){
    flag = false;
  }
  function launchchecker(YorN){
    if(YorN == 0){
      return("No")
    }
    if(YorN == 1){
      return("Yes")
    }
    else{
      return("error")
    }
  }

    return (
        <div>




          <h1><center>Welcome to the Designer Landing Page!</center></h1>
          <h1><center>You've Logged in!</center></h1>
          <br/>
          <center>
          If you have a project, it will show up here: <br/><br/>
          Developer Name: {listofprojects[0]}<br/>
          Project Name: {listofprojects[3]}<br/>
          Project Type: {listofprojects[1]}<br/>
          Project Story: {listofprojects[2]}<br/>
          Project Fundraising Goal: {listofprojects[5]}<br/>
          Is the Project Launched? : {launchchecker(listofprojects[4])}<br/>
          Funds Raised by the Project: {listofprojects[6]}<br/>
          Project deadline: {listofprojects[7]}<br/><br/>
          <button onClick={() => {setList(initialprojectlist); resetflag()}}>Reset List</button>
          </center>
          <br/>
          {/* <h5><center>I need to put a list of projects here</center></h5> */}
          <center><button onClick={()=>handleToProject()} type="submit" className="btn">Go to Project Page</button></center>

          <br/>

          <center><button onClick={Create_Project}>Create A Project</button></center>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>

          </div>


          
        );
    }


export default Designer_LandingPage;