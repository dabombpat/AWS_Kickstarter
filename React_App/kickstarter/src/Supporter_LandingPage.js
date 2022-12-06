import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { currentuser } from "./App";
import currentproject from './App';


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var search_url = base_url + "search";      // POST: {arg1:5, arg2:7}
let initialprojectlist = [];
let hasloadedprojects = false;


function Supporter_LandingPage(){
  let username = currentuser.user
  console.log(username)
  const navigate = useNavigate();
  const [listofprojects, setList] = useState(initialprojectlist);

  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    navigate('/');
  }

  const [searchval, setSearchVal] = useState(null);
  
  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "searchval"){
      setSearchVal(value);
    }
}

function SearchGenre(genre) { // Requests List of Projects by the logged in Designer
  if(hasloadedprojects == false){
  hasloadedprojects = true;
  // Creating Lambda Payload
  var data = {};
  data["genre"] = genre;
  
  // Wrapping Payload in a "Body"
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", search_url, true);

  console.log('Asking Lambda for Projects by Genre : ', genre)
  xhr.send(js);

  // This will process results and update HTML as appropriate. 
  xhr.onloadend = function () {
  
  if (xhr.readyState == XMLHttpRequest.DONE) {
    console.log('Received Data from Lambda')

    var parsed_response = JSON.parse(xhr.responseText);
    //console.log("JSONParse Result :", responseunit)
    var response_info  = parsed_response["body"];
    //console.log("result : ", response_info)
    
    if(response_info != undefined){
      for(let i=0; i < (response_info.length); i++){
        console.log(i)
        if(i>0){
          setList(listofprojects => [...listofprojects, [response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]]])
        }
        else{
          setList(listofprojects => [[response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]]])
        }}
    console.log(listofprojects)
  }

  } else {
    console.log("did not receive projects back")
  }
}
};
}

function displayprojects(){
  return(listofprojects.map((item,index)=>{
      console.log(index)
       return( 
       <center >
        Project Name: {listofprojects[index][3]}<br/>
        Developer Name: {listofprojects[index][0]}<br/>
        Project Type: {listofprojects[index][1]}<br/>
        Project Story: {listofprojects[index][2]}<br/>
        Project Fundraising Goal: {listofprojects[index][5]}<br/>
        Is the Project Launched? : {launchchecker(listofprojects[index][4])}<br/>
        Funds Raised by the Project: {listofprojects[index][6]}<br/>
        Project deadline: {listofprojects[index][7]}<br/>
       <center><button onClick={()=>handleToProject(1, listofprojects[index][3])} type="submit" className="btn">Go to Project : {listofprojects[index][3]}</button></center><br/>
       </center>
        )}))
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

const handleToProject  = (project_number, project_name) => {
  hasloadedprojects = false;
  currentproject.projectnum = project_number;
  currentproject.projectname = project_name;

  console.log("Navigating to Project Page", project_name, "(from DLP page) ---------------------")
  navigate('/Supporter_ProjectPage');
}




    return (
        <div>
      
          <h1><center>Welcome to the Supporter Home Page!</center></h1>
          <h1><center>You're Logged in as a Supporter</center></h1>

          <center>
          <div className="form">
            <div className="form-body">
              <div className="searchval">
                <label className="form__label" htmlFor="searchval">Search for a Project By Genre Here : </label>
                <input className="form_label" type="text" value={searchval} onChange = {(e) => handleInputChange(e)} id="searchval" placeholder="Game"/>
                <center><button onClick={()=>{SearchGenre(searchval); hasloadedprojects = false;}} type="submit" className="btn">Search</button></center>
              </div>
            </div>
          </div>
          </center>

          {displayprojects()}

          <br/>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>
          </div>
        );
    }


export default Supporter_LandingPage;