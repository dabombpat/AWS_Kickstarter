import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var project_info_url = base_url + "projectviewer";      // POST: {arg1:5, arg2:7}
var pledge_info_url = base_url + "pledgeviewer";      // POST: {arg1:5, arg2:7}
var delete_project_url = base_url + "deleteproject";      // POST: {arg1:5, arg2:7}
var delete_pledge_url = base_url + "deletepledge";      // POST: {arg1:5, arg2:7}
var launch_project_url = base_url + "launchproject";      // POST: {arg1:5, arg2:7}
var pledge_supporter_url = base_url + "pledgesupporterviewer";      // POST: {arg1:5, arg2:7}


let hasloadedprojects = false;
let hasloadedpledges = false;
let initialprojectlist = [];
let initialpledgelist = [];
let initialpledgesupporterlist = [];

function Designer_ProjectPage(){
  const navigate = useNavigate();
  RequestProjectListFromLambda(currentuser.user, currentproject.projectname)
  RequestPledgeListFromLambda(currentproject.projectname)
  const [listofprojects, setProjectList] = useState(initialprojectlist); 
  const [pledge_list, setPledgeList] = useState(initialpledgelist);
  const [pledge_supporter_list, setPledgeSupporterList] = useState(initialpledgesupporterlist);

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
            RequestPledgeSupporterListFromLambda(currentproject.projectname, response_info[i]["reward"])
            //console.log(i)
            if(i>0){
              setPledgeList(pledge_list => [...pledge_list, [response_info[i]["projectname"], response_info[i]["reward"], response_info[i]["amount"], response_info[i]["maxsupporters"], response_info[i]["currentsupporters"]]])
            }
            else{
              setPledgeList(pledge_list => [[response_info[i]["projectname"], response_info[i]["reward"], response_info[i]["amount"], response_info[i]["maxsupporters"], response_info[i]["currentsupporters"]]])
            }}
      }
  
      } else {
        console.log("did not receive projects back")
      }

    };
  }
  }

  function RequestPledgeSupporterListFromLambda(project_name, reward) {
    // Creating Payload to send to Lambda
    var data = {};
    data["projectname"] = project_name;
    data["reward"] = reward;
    
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", pledge_supporter_url, true);
    xhr.send(js);
  
    console.log('Sent Request to Lambda for list of pledge supporter: ')
    // This will process results and update HTML as appropriate. 
    
    xhr.onloadend = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log('Received Pledge Supporter Data from Lambda')
        

        var parsed_response = JSON.parse(xhr.responseText);
        //console.log("JSONParse Result :", responseunit)
        var response_info  = parsed_response["result"];
        //console.log("result : ", response_info)
        
        if(response_info != undefined){
          for(let i=0; i < (response_info.length); i++){
            //console.log(response_info[i]["supporterusername"])
            if(pledge_supporter_list[0] != ""){
              setPledgeSupporterList(pledge_supporter_list => [...pledge_supporter_list, [response_info[i]["supporterusername"], response_info[i]["reward"]]])
            }
            else{
              setPledgeSupporterList(pledge_supporter_list => [[response_info[i]["supporterusername"], response_info[i]["reward"]]])
              
            }
            
          }
      }
  
      } else {
        console.log("did not receive projects back")
      }
  };
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

  function displaypledges(){
    return(pledge_list.map((item,index)=>{
         return( 
         <center >
          <h4><center>This is the pledge : "{pledge_list[index][1]}"</center></h4>
          <center><button onClick={()=>{handleDeletePledge(currentuser.user, currentproject.projectname, pledge_list[index][1], pledge_list[index][2]); resethasloaded()}} type="submit" className="btn">Delete This Pledge</button></center>
          Project Name: {pledge_list[index][0]}<br/>
          Pledge Reward: {pledge_list[index][1]}<br/>
          Required Pledge Amount: {pledge_list[index][2]}<br/>
          Max Supporters : {pledge_list[index][3]}<br/>
          Current Supporters : {pledge_list[index][4]}<br/><br/>
          <br/></center>
          )}))
}

function displaypledgesupporters(){
  console.log(pledge_supporter_list)
  return(pledge_supporter_list.map((item,index)=>{
       return( 
       <center >
        Supporter {pledge_supporter_list[index][0]} has claimed the pledge "{pledge_supporter_list[index][1]}"<br/>
        </center>
        )}))
}

function handleDeletePledge(username, projectname, reward, amount){
  // Creating Payload to send to Lambda
  var data = {};
  data["username"] = username;
  data["projectname"] = projectname;
  data["reward"] = reward;
  data["amount"] = amount;

  
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", delete_pledge_url, true);
  xhr.send(js);

  console.log('Sent Request to Lambda to delete Pledge : ', reward)
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('Received Response from Lambda')

      var parsed_response = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", responseunit)
      var response_info  = parsed_response["result"];
      //console.log("result : ", response_info[0]["username"], response_info[0]["type"],)
      alert("Deleted Pledge!")
      let hasloadedpledges = false;
      //navigate('/Designer_LandingPage');
      if(response_info != undefined){
    }
    
    } else {
      console.log("did not receive projects back")
    }
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


  function handleDeleteProject(project_name, designer_name, pledge_list){
    for (let m=0; m<(pledge_list.length); m++){
      let hasloadedpledges = false;
      console.log("looking to delete pledge # ", m)
      handleDeletePledge(currentproject.user, currentproject.projectname, pledge_list[m][1], pledge_list[m][2])
    }
    
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
        let hasloadedprojects = false;
  
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

  function handlecreateapledge(){
    console.log("Navigating to Create a Pledge")
    navigate('/Designer_Create_Pledge');
  }

  function handleToProjectActivity(){
    console.log("Navigating to Project Activity Page")
    navigate('/Designer_ProjectActivity');
  }

  const handleBack  = () => {
    console.log("Navigating back to the Designer Landing Page (from project landing) ---------------------")
    navigate('/Designer_LandingPage');
  }

  function resethasloaded(){
    hasloadedprojects = false;
    hasloadedpledges = false;
  }

  function handleLaunchProject(project){
  // Creating Payload to send to Lambda
  var data = {};
  data["username"] = currentuser.user;
  data["name"] = project;
  
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", launch_project_url, true);
  xhr.send(js);

  console.log('Sent Request to Lambda to Launch Project')
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('Received Response from Lambda')
      alert("Launched Project!")
      var parsed_response = JSON.parse(xhr.responseText);
      //console.log("JSONParse Result :", responseunit)
      var response_info  = parsed_response["result"];
      //console.log("result : ", response_info[0]["username"], response_info[0]["type"],)
      navigate('/Designer_ProjectPage');
      if(response_info != undefined){
    }
    
    } else {
      console.log("did not receive projects back")
    }
};
}


console.log("!!! :", pledge_supporter_list)
    return (
        <div>

          <h1><center>Welcome to the Landing Page of your project!</center></h1>
          <h1><center>This is your project : "{currentproject.projectname}"</center></h1>
          <center><button onClick={()=>{handleLaunchProject(currentproject.projectname); resethasloaded()}} type="submit" className="btn">Launch This Project!</button></center>

          {displayprojectinfo()}
          {displaypledges()}

          <center>List of Current Supporters :  
          --------------------------------------
          {displaypledgesupporters()}</center><br/><br/>

          <center><button onClick={()=>{handlecreateapledge(); resethasloaded()}} type="submit" className="btn">Create a new pledge</button></center>
          <center><button onClick={()=>{handleDeleteProject(currentproject.projectname, currentuser.user, pledge_list); resethasloaded()}} type="submit" className="btn">DELETE THIS PROJECT</button></center>
          <center><button onClick={()=>{handleToProjectActivity(); resethasloaded()}} type="submit" className="btn">View Project Activity</button></center>
          <center><button onClick={()=>{handleBack(); resethasloaded()}} type="submit" className="btn">Back to Homepage</button></center>
          </div>

        );
}


export default Designer_ProjectPage;