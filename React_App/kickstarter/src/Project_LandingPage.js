import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var project_info_url = base_url + "projectviewer";      // POST: {arg1:5, arg2:7}
let hasloadedprojects = false;

function Project_LandingPage(){
  const navigate = useNavigate();
  let initialprojectinfo = [];
  RequestInfoFromLambda(currentuser.user, currentproject.name)
  const [project_info, setList] = useState(initialprojectinfo);

  function RequestInfoFromLambda(designer_name, project_name) {
    if(hasloadedprojects){
    
    // Creating Payload to send to Lambda
    var data = {};
    data["username"] = designer_name;
    data["name"] = project_name;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", project_info_url, true);
  
    // send the collected data as JSON
    //
    //console.log(js);
    xhr.send(js);
  
    console.log('Sent Request to Lambda for information about project : ', project_name)
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
          //console.log("list: ", listofprojects)
          setList(project_info => [ response_info["username"], response_info["type"], response_info["story"], response_info["name"], response_info["launched"], response_info["goal"], response_info["funds"], response_info["deadline"],])

        console.log(project_info)
      }
  
      } else {
        console.log("did not receive projects back")
      }

  };
  }
  }


  function displayprojectinfo(){
    if(currentuser.user == undefined){
      return(
        <center>
        <h5>Please Re-Login to see your projects!</h5>
        <br/>
        {/* <button onClick={() => {resethasloadedprojects(); handleBackToLogin()}}>Log Back In</button> */}
        </center>
      )
    }
    else{
    return(
      <center>
      <br/>
      {/* Developer Name: {listofprojects[0]}<br/>
      Project Name: {listofprojects[3]}<br/>
      Project Type: {listofprojects[1]}<br/>
      Project Story: {listofprojects[2]}<br/>
      Project Fundraising Goal: {listofprojects[5]}<br/>
      Is the Project Launched? : {launchchecker(listofprojects[4])}<br/>
      Funds Raised by the Project: {listofprojects[6]}<br/>
      Project deadline: {listofprojects[7]}<br/><br/> */}
      {/* <button onClick={() => {setList(initialprojectlist); resethasloadedprojects()}}>Reset List</button> */}
      {/* <center><button onClick={()=>handleToProject(1, listofprojects[3])} type="submit" className="btn">Go to Project : {listofprojects[3]}</button></center> */}
      </center>
    )}}

    function handleDeleteProject(){
      console.log("do you really want to delete this project?")
    }

    function handlecreateapledge(){
      console.log("Navigating to Create a Pledge")
      navigate('/pledge_creator');
    }




    return (
        <div>

          <h1><center>Welcome to the Landing Page of your project!</center></h1>
          <h1><center>This is your project : "{currentproject.projectname}"</center></h1>
          <center><button onClick={()=>handlecreateapledge()} type="submit" className="btn">Create a new pledge</button></center>
          <center><button onClick={()=>handleDeleteProject()} type="submit" className="btn">DELETE THIS PROJECT</button></center>
          </div>

        );
}


export default Project_LandingPage;