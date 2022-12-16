import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var view_activity_url = base_url + "viewprojectactivity";      // POST: {arg1:5, arg2:7}
var project_info_url = base_url + "projectviewer";      // POST: {arg1:5, arg2:7}


let hasloadedactivity = false;
let hasloadedprojects = false;
let initialactivitylist = [];
let initialprojectlist = [];

function Designer_ProjectPage(){
  const navigate = useNavigate();
  RequestActivityListFromLambda(currentproject.projectname)
  RequestProjectListFromLambda(currentuser.user, currentproject.projectname)
  const [Activity_list, setActivityList] = useState(initialactivitylist);
  const [listofprojects, setProjectList] = useState(initialprojectlist); 

  function RequestActivityListFromLambda(project_name) {
    if(hasloadedactivity == false){
      hasloadedactivity = true;
    // Creating Payload to send to Lambda
    var data = {};
    data["name"] = project_name;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", view_activity_url, true);
    xhr.send(js);
  
    console.log('Sent Request to Lambda for Project Activity: ')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Project Activity from Lambda')
        

        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        console.log("result : ", response_info)
        
        if(response_info != undefined){
          for(let i=0; i < (response_info.length); i++){
            
            if(i>0){
              setActivityList(Activity_List => [...Activity_List, [response_info[i]["project"], response_info[i]["supporter"], response_info[i]["claimedpledge"], response_info[i]["directsupport"]]])
            }
            else{
              setActivityList(Activity_List => [[response_info[i]["project"], response_info[i]["supporter"], response_info[i]["claimedpledge"], response_info[i]["directsupport"]]])
            }}
      }
  
      } else {
        console.log("did not receive projects back")
      }

    };
  }
  }

  function RequestProjectListFromLambda(designer_name, project_name) {
    if(hasloadedprojects == false){
      hasloadedprojects = true;
    
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
        //console.log("result : ", response_info[0]["username"], response_info[0]["type"],)
        if(response_info != undefined){
        setProjectList(listofprojects => [response_info[0]["username"], response_info[0]["type"], response_info[0]["story"], response_info[0]["name"], response_info[0]["launched"], response_info[0]["goal"], response_info[0]["funds"], response_info[0]["deadline"]])
        //console.log("Updated : ", listofprojects)
      }
      
      } else {
        console.log("did not receive projects back")
      }
  };
  }}

  function DisplayActivity(){
    let pledgeorsupport
    let num
    return(Activity_list.map((item,index)=>{
      if(Activity_list[index][2] != null){
        pledgeorsupport = "Claimed Pledge"
        num = 2
      }
      else{
        pledgeorsupport = "Direct Support"
        num = 3
      }
         return( 
         <center>

          Supporter: "{Activity_list[index][1]}"<br/>
          Project Name: {Activity_list[index][0]}<br/>
          {pledgeorsupport}: {Activity_list[index][num]}<br/>
          <br/></center>
          )}))
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
          Project Name: {listofprojects[3]}<br/>
          Developer Name: {listofprojects[0]}<br/>
          Project Type: {listofprojects[1]}<br/>
          Project Story: {listofprojects[2]}<br/>
          Project Fundraising Goal: {listofprojects[5]}<br/>
          Is the Project Launched? : {launchchecker(listofprojects[4])}<br/>
          Funds Raised by the Project: {listofprojects[6]}<br/>
          Project deadline: {listofprojects[7]}<br/>
          Has the Project Reached it's Goal? : {goalchecker(listofprojects[6], listofprojects[5])}<br/><br/>
      </center>
    )}
  }

  const handleBack  = () => {
    console.log("Navigating back to the Designer Landing Page (from project landing) ---------------------")
    navigate('/Designer_LandingPage');
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

  function goalchecker(fundsraised, goal){
    if(goal > fundsraised){
      return("No")
    }
    if(goal < fundsraised){
      return("Yes")
    }
    else{
      return("error")
    }
  }

  function resethasloaded(){
    hasloadedactivity = false;
  }


    return (
        <div>

          <h1><center>This Page Displays Project Activty</center></h1>
          <h1><center>This is your project : "{currentproject.projectname}"</center></h1>
          <center>This project has raised: {listofprojects[6]} out of {listofprojects[5]}</center><br/><br/>

          {DisplayActivity()}

          <center><button onClick={()=>{handleBack(); resethasloaded()}} type="submit" className="btn">Back to Homepage</button></center>
          </div>

        );
}


export default Designer_ProjectPage;