import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var project_info_url = base_url + "projectviewer";      // POST: {arg1:5, arg2:7}
var pledge_info_url = base_url + "pledgeviewer";      // POST: {arg1:5, arg2:7}
var delete_project_url = base_url + "deleteproject";      // POST: {arg1:5, arg2:7}
var claim_pledge_url = base_url + "claimpledge";      // POST: {arg1:5, arg2:7}
var launch_project_url = base_url + "launchproject";      // POST: {arg1:5, arg2:7}


let hasloadedprojects = false;
let hasloadedpledges = false;
let initialprojectlist = [];
let initialpledgelist = [];

function Supporter_ProjectPage(){
  const navigate = useNavigate();
  RequestProjectListFromLambda(currentproject.designer, currentproject.projectname)
  RequestPledgeListFromLambda(currentproject.projectname)
  const [listofprojects, setProjectList] = useState(initialprojectlist); 
  const [pledge_list, setPledgeList] = useState(initialpledgelist);

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
        setProjectList(listofprojects => [response_info[0]["username"], response_info[0]["type"], response_info[0]["story"], response_info[0]["name"], response_info[0]["launched"], response_info[0]["goal"], response_info[0]["funds"], response_info[0]["deadline"],response_info[0]["success"],response_info[0]["failed"]])
        //console.log("Updated : ", listofprojects)
      }
      
      } else {
        console.log("did not receive projects back")
      }
  };
  }}

  function RequestPledgeListFromLambda(project_name) {
    if(hasloadedpledges == false){
      hasloadedpledges = true;
    // Creating Payload to send to Lambda
    var data = {};
    data["projectname"] = project_name;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", pledge_info_url, true);
    xhr.send(js);
  
    console.log('Sent Request to Lambda for list of pledges: ')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Pledge Data from Lambda')
        

        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        //console.log("result : ", response_info)
        
        if(response_info != undefined){
          for(let i=0; i < (response_info.length); i++){
            //console.log(i)
            if(i>0){
              setPledgeList(pledge_list => [...pledge_list, [response_info[i]["projectname"], response_info[i]["reward"], response_info[i]["amount"], response_info[i]["maxsupporters"], response_info[i]["currentsupporters"]]])
            }
            else{
              setPledgeList(pledge_list => [[response_info[i]["projectname"], response_info[i]["reward"], response_info[i]["amount"], response_info[i]["maxsupporters"], response_info[i]["currentsupporters"]]])
            }}
        console.log(listofprojects)
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

  function viewpledges(index){
    //console.log("viewpledge",listofprojects[8] )
    if(listofprojects[8] == 1){
      return("")
    }    
    if(listofprojects[9] == 1){
      return("")
    }
    else{
      return(<center><button onClick={()=>{handleClaimPledge(currentuser.user, currentproject.projectname, pledge_list[index][1], pledge_list[index][2], pledge_list[index][3], pledge_list[index][4]); resethasloaded()}} type="submit" className="btn">Claim This Pledge!</button></center>)
  }}



  function displaypledges(){
    //console.log("HERE")
    return(pledge_list.map((item,index)=>{
        //console.log(index)


         return( 
         <center >
          <h4><center>This is the pledge : "{pledge_list[index][1]}"</center></h4>
          {viewpledges(index)}
          Pledge Name: {pledge_list[index][0]}<br/>
          Project Name: {pledge_list[index][0]}<br/>
          Pledge Reward: {pledge_list[index][1]}<br/>
          Required Pledge Amount: {pledge_list[index][2]}<br/>
          Max Supporters : {pledge_list[index][3]}<br/>
          Current Supporters : {pledge_list[index][4]}<br/>
          <br/></center>
          )}))
}

function handleClaimPledge(supporter_username, project_name, pledge_reward, pledge_amount, max_supporters, current_supporters){
  // Creating Payload to send to Lambda
  if(max_supporters == null){
    max_supporters = 1000
  }
  var data = {};
  data["username"] = supporter_username;
  data["projectname"] = project_name;
  data["reward"] = pledge_reward;
  data["amount"] = pledge_amount;
  data["maxsupporters"] = max_supporters;
  data["currentsupporters"] = current_supporters;
  
  
  if(current_supporters < max_supporters){
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", claim_pledge_url, true);
  xhr.send(js);

  console.log('Sent Request to Lambda to Claim This Pledge : ', pledge_reward)
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('Received Response from Lambda')

      var parsed_response = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", responseunit)
      var response_info  = parsed_response["result"];
      //console.log("result : ", response_info[0]["username"], response_info[0]["type"],)
      alert("Claimed Pledge!")
      let hasloadedpledges = false;
      navigate('/Supporter_LandingPage');
      if(response_info != undefined){
    }
    
    } else {
      console.log("did not receive projects back")
    }}
};
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
          Project deadline: {listofprojects[7]}<br/><br/>
      </center>
    )}
  }

  function handleDeleteProject(project_name, designer_name){
    // Creating Payload to send to Lambda
    var data = {};
    data["username"] = designer_name;
    data["name"] = project_name;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", delete_project_url, true);
    xhr.send(js);
  
    console.log('Sent Request to Lambda to delete Project : ', project_name)
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Response from Lambda')
  
        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        //console.log("result : ", response_info[0]["username"], response_info[0]["type"],)
        alert("Deleted Project!")
        navigate('/Designer_LandingPage');
        if(response_info != undefined){
      }
      
      } else {
        console.log("did not receive projects back")
      }
  };
  }

  const handleBack  = () => {
    console.log("Navigating back to the Designer Landing Page (from project landing) ---------------------")
    navigate('/Supporter_LandingPage');
  }

  const handletoDirectSupport  = () => {
    console.log("Navigating back to the Supporter Direct Support Page (from project landing) ---------------------")
    navigate('/Supporter_DirectSupport');
  }

  function resethasloaded(){
    hasloadedprojects = false;
    hasloadedpledges = false;
  }

  function displaydirectsupport(){
    if(listofprojects[8] == 1){
      return(<center>This project has succeeded and cannot accept any more funding</center>)
    }    
    if(listofprojects[9] == 1){
      return(<center>This project has failed and cannot accept any more funding</center>)
    }
    else{
      return(<center><button onClick={()=>{handletoDirectSupport(); resethasloaded()}} type="submit" className="btn">Direct Support</button></center>)
  }}

    return (
        <div>

          <h1><center>This is the project : "{currentproject.projectname}"</center></h1>

          {displayprojectinfo()}

          {displaydirectsupport()}
          

          {displaypledges()}

          <center><button onClick={()=>{handleBack(); resethasloaded()}} type="submit" className="btn">Back to Homepage</button></center>
          </div>

        );
}


export default Supporter_ProjectPage;