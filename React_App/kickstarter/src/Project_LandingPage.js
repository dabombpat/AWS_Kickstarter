import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var project_info_url = base_url + "projectviewer";      // POST: {arg1:5, arg2:7}
let hasloadedprojects = false;
let hasloadedpledges = false;
let initialprojectlist = [];
let initialpledgelist = [];

function Project_LandingPage(){
  const navigate = useNavigate();
  RequestProjectListFromLambda(currentuser.user, currentproject.projectname)
  RequestPledgeListFromLambda(currentuser.user, currentproject.projectname)
  const [project_list, setProjectList] = useState(initialprojectlist);
  const [pledge_list, setPledgeList] = useState(initialpledgelist);

  function RequestProjectListFromLambda(designer_name, project_name) {
    if(hasloadedprojects == false){
    
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
    xhr.send(js);
  
    console.log('Sent Request to Lambda for information about project : ', project_name)
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Data from Lambda')
  
        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        //console.log("result : ", response_info)
        hasloadedprojects = true;
        if(response_info != undefined){
          setProjectList(project_list => [ response_info[0]["username"], response_info[0]["type"], response_info[0]["story"], response_info[0]["name"], response_info[0]["launched"], response_info[0]["goal"], response_info[0]["funds"], response_info[0]["deadline"],])
          displayprojectinfo()
        console.log(project_list)
      }
  
      } else {
        console.log("did not receive projects back")
      }
  };
  }
  }

  function RequestPledgeListFromLambda(project_name) {
    if(hasloadedpledges == false){
    
    // Creating Payload to send to Lambda
    var data = {};
    data["projectname"] = project_name;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", project_info_url, true);
    xhr.send(js);
  
    console.log('Sent Request to Lambda for list of pledges: ', project_name)
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Pledge Data from Lambda')
  
        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        //console.log("result : ", response_info)
        hasloadedpledges = true;
        if(response_info != undefined){
          setPledgeList(pledge_list => [ response_info[0]["projectname"], response_info[0]["reward"], response_info[0]["amount"], response_info[0]["maxsupporters"], response_info[0]["currentsupporters"]])
          displaypledgeinfo()
        console.log(pledge_list)
      }
  
      } else {
        console.log("did not receive projects back")
      }
  };
  }
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
      Developer Name: {project_list[0]}<br/>
      Project Name: {project_list[3]}<br/>
      Project Type: {project_list[1]}<br/>
      Project Story: {project_list[2]}<br/>
      Project Fundraising Goal: {project_list[5]}<br/>
      Is the Project Launched? : {launchchecker(project_list[4])}<br/>
      Funds Raised by the Project: {project_list[6]}<br/>
      Project deadline: {project_list[7]}<br/><br/>
      </center>
    )}}

  function displaypledgeinfo(){
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
      Project Name: {pledge_list[0]}<br/>
      Reward: {pledge_list[1]}<br/>
      Amount: {pledge_list[2]}<br/>
      Max Supporters: {pledge_list[3]}<br/>
      Current Supporters: {pledge_list[4]}<br/>
      </center>
    )}}


    function handleDeleteProject(){
      console.log("do you really want to delete this project?")
    }

    function handlecreateapledge(){
      console.log("Navigating to Create a Pledge")
      navigate('/pledge_creator');
    }

    const handleBack  = () => {
      console.log("Navigating back to the Designer Landing Page (from project landing) ---------------------")
      navigate('/designer_landing');
    }

    function resethasloadedprojects(){
      hasloadedprojects = false;
    }

    return (
        <div>

          <h1><center>Welcome to the Landing Page of your project!</center></h1>
          <h1><center>This is your project : "{currentproject.projectname}"</center></h1>

          {displayprojectinfo()}
          {displaypledgeinfo()}

          <center><button onClick={()=>{handlecreateapledge(); resethasloadedprojects()}} type="submit" className="btn">Create a new pledge</button></center>
          <center><button onClick={()=>{handleDeleteProject(); resethasloadedprojects()}} type="submit" className="btn">DELETE THIS PROJECT</button></center>
          <center><button onClick={()=>{handleBack(); resethasloadedprojects()}} type="submit" className="btn">Back to Homepage</button></center>
          </div>

        );
}


export default Project_LandingPage;