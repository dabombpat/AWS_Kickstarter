import React, { useState } from "react";
import {ReactDOM} from 'react';
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import currentuser from "./App";
import currentproject from './App';

var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var view_activity_url = base_url + "viewsupporteractivity";      // POST: {arg1:5, arg2:7}


let hasloadedactivity = false;
let initialactivitylist = [];

function Designer_ProjectPage(){
  const navigate = useNavigate();
  RequestActivityListFromLambda(currentuser.user)
  const [Activity_list, setActivityList] = useState(initialactivitylist);


  function RequestActivityListFromLambda(supporter_name) {
    if(hasloadedactivity == false){
      hasloadedactivity = true;
    // Creating Payload to send to Lambda
    var data = {};
    data["supporter"] = supporter_name;
    
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

          Project Name: {Activity_list[index][0]}<br/>
          {pledgeorsupport}: {Activity_list[index][num]}<br/>
          <br/></center>
          )}))
  }



  const handleBack  = () => {
    console.log("Navigating back to the Supporter Landing Page ---------------------")
    navigate('/Supporter_LandingPage');
  }

  function resethasloaded(){
    hasloadedactivity = false;
  }


    return (
        <div>

          <h1><center>This Page Displays Your Supporter Activty</center></h1>

          {DisplayActivity()}

          <center><button onClick={()=>{handleBack(); resethasloaded()}} type="submit" className="btn">Back to Homepage</button></center>
          </div>

        );
}


export default Designer_ProjectPage;