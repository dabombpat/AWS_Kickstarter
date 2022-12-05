import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { currentuser } from "./App";


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var adminlister_url = base_url + "adminlister";      // POST: {arg1:5, arg2:7}
let initialprojectlist = [];
let hasloadedprojects = false;


function Admin_LandingPage(){
  let username = currentuser.user
  const [listofprojects, setList] = useState(initialprojectlist);
  const navigate = useNavigate();
  Project_List_Caller();




  function Project_List_Caller(username) { // Requests List of Projects by the logged in Designer
    if(hasloadedprojects == false){
    // Creating Lambda Payload
    var data = {};
    
    // Wrapping Payload in a "Body"
    var body = {}
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
  
    var xhr = new XMLHttpRequest();
    xhr.open("GET", adminlister_url, true);

    console.log('Asking Lambda for All Projects')
    xhr.send(js);
  
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
        console.log("r_info: ", response_info)
        //console.log("r_length: ", response_info.length)
        //console.log("test: ", response_info[0]["username"])
        //console.log("list: ", listofprojects)
        for(let i=0; i < (3); i++){
          //console.log(i)
          if(i>0){
            setList(listofprojects => [...listofprojects, response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]])
          }
          else{
            setList(listofprojects => [response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]])
          }
          console.log("Round :", i, "result :", listofprojects)
      }
        console.log(listofprojects)
    }

    } else {
      console.log("did not receive projects back")
    }
  }
  };
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
      Project Type: {listofprojects[1]}<br/>
      Project Story: {listofprojects[2]}<br/>
      Project Fundraising Goal: {listofprojects[5]}<br/>
      Is the Project Launched? : {launchchecker(listofprojects[4])}<br/>
      Funds Raised by the Project: {listofprojects[6]}<br/>
      Project deadline: {listofprojects[7]}<br/><br/>
      {/* <button onClick={() => {setList(initialprojectlist); resethasloadedprojects()}}>Reset List</button> */}
      {/* <center><button onClick={()=>handleToProject(1, listofprojects[3])} type="submit" className="btn">Go to Project : {listofprojects[3]}</button></center> */}

      {(listofprojects.length > 8) &&
      <p>
      Project Name: {listofprojects[11]}<br/>
      Developer Name: {listofprojects[8]}<br/>
      Project Type: {listofprojects[9]}<br/>
      Project Story: {listofprojects[10]}<br/>
      Project Fundraising Goal: {listofprojects[13]}<br/>
      Is the Project Launched? : {launchchecker(listofprojects[12])}<br/>
      Funds Raised by the Project: {listofprojects[14]}<br/>
      Project deadline: {listofprojects[15]}<br/><br/>
      </p>
      }

      {(listofprojects.length > 16) &&
      <p>
      Project Name: {listofprojects[19]}<br/>
      Developer Name: {listofprojects[16]}<br/>
      Project Type: {listofprojects[17]}<br/>
      Project Story: {listofprojects[18]}<br/>
      Project Fundraising Goal: {listofprojects[21]}<br/>
      Is the Project Launched? : {launchchecker(listofprojects[20])}<br/>
      Funds Raised by the Project: {listofprojects[22]}<br/>
      Project deadline: {listofprojects[23]}<br/><br/>
      </p>
      }
      </center>
    )}

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


  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    navigate('/');
  }


    return (
        <div>
      
          <h1><center>Welcome to the Admin Home Page!</center></h1>
          <h1><center>You're Logged in as Admin!</center></h1>

          {displayprojects()}

          <br/>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>
          </div>

          
        );
    }


export default Admin_LandingPage;