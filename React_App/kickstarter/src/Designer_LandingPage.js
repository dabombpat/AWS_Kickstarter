import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';
export


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var devlister_url = base_url + "devlister";      // POST: {arg1:5, arg2:7}
let initialprojectlist = [];
let hasloadedprojects = false;



function Designer_LandingPage(){
  let username = currentuser.user;
  const [listofprojects, setList] = useState(initialprojectlist);
  const navigate = useNavigate();
  DevlisterCaller(username);

  function DevlisterCaller(username) { // Requests List of Projects by the logged in Designer
    if(hasloadedprojects == false){
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

      var parsed_response = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", responseunit)
      var response_info  = parsed_response["body"];
      //console.log("result : ", response_info)
      hasloadedprojects = true;
      if(response_info != undefined){
        console.log("list: ", listofprojects)
        for(var i=0; i < response_info.length; i++){
          setList(listofprojects => [ response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"],])
        }
      console.log(listofprojects)
    }

    } else {
      console.log("did not receive projects back")
    }
  }
  };
  }





  function Create_Project(){
    hasloadedprojects = false;
    console.log("Navigating to Create A Project Page! ---------------------")
    navigate('/create_project');
  }

    
  const handleBackToLogin  = () => {
    hasloadedprojects = false;
    console.log("Navigating back to the Login Page (from DLP page) ---------------------")
    navigate('/');
  }

  const handleToProject  = (project_number, project_name) => {
    hasloadedprojects = false;
    currentproject.projectnum = project_number;
    currentproject.projectname = project_name;

    console.log("Navigating to Project Page", project_name, "(from DLP page) ---------------------")
    navigate('/project_page');
  }

  function resethasloadedprojects(){
    hasloadedprojects = false;
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

  function displayprojects(){
    console.log("LOP :", listofprojects )
    if(username == undefined){
      return(
        <center>
        <h5>Please Re-Login to see your projects!</h5>
        <br/>
        <button onClick={() => {resethasloadedprojects(); handleBackToLogin()}}>Log Back In</button>
        </center>
      )
    }
    if(listofprojects.length != 0){
    return(

      <center>
      <br/>
      Project Name: {listofprojects[3]}<br/>
      Developer Name: {listofprojects[0]}<br/>
      {/* Project Type: {listofprojects[1]}<br/> */}
      Project Story: {listofprojects[2]}<br/>
      {/* Project Fundraising Goal: {listofprojects[5]}<br/> */}
      Is the Project Launched? : {launchchecker(listofprojects[4])}<br/>
      {/* Funds Raised by the Project: {listofprojects[6]}<br/> */}
      {/* Project deadline: {listofprojects[7]}<br/><br/> */}
      {/* <button onClick={() => {setList(initialprojectlist); resethasloadedprojects()}}>Reset List</button> */}
      <center><button onClick={()=>handleToProject(1, listofprojects[3])} type="submit" className="btn">Go to Project : {listofprojects[3]}</button></center>
      </center>
    )}

    if(listofprojects.length == 16){
      return(
  
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
        <br/>
        If you have a project, it will show up here: <br/><br/>
        Developer Name: {listofprojects[8]}<br/>
        Project Name: {listofprojects[11]}<br/>
        Project Type: {listofprojects[9]}<br/>
        Project Story: {listofprojects[10]}<br/>
        Project Fundraising Goal: {listofprojects[13]}<br/>
        Is the Project Launched? : {launchchecker(listofprojects[12])}<br/>
        Funds Raised by the Project: {listofprojects[14]}<br/>
        Project deadline: {listofprojects[15]}<br/><br/>
        <center><button onClick={()=>handleToProject(1, listofprojects[3])} type="submit" className="btn">Go to Project : {listofprojects[3]}</button></center>
        <center><button onClick={()=>handleToProject(2, listofprojects[11])} type="submit" className="btn">Go to Project : {listofprojects[11]}</button></center>
        {/* <button onClick={() => {setList(initialprojectlist); resethasloadedprojects()}}>Reset List</button> */}
        </center>
      )}


  }




    return (
      <div>

          
          <h1><center>Welcome to the Designer Home Page!</center></h1>
          <h1><center>You've Logged in!</center></h1>
          <br/>
          <center>If you have a project, it will show up here:</center>

          {displayprojects()}
          <br/>


          
          <center><button onClick={Create_Project}>Create A Project</button></center>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>

          </div>
        );
    }


export default Designer_LandingPage;