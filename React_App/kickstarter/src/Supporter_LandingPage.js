import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import currentuser from './App';
import currentproject from './App';


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var search_url = base_url + "search";      // POST: {arg1:5, arg2:7}
var add_funds_url = base_url + "addfunds";
let initialprojectlist = [];
let initialFunds = [];
let hasloadedprojects = false;
let hasaddedfunds = false;


function Supporter_LandingPage(){
  let username = currentuser.user
  console.log("USERNAME : ", username)
  const navigate = useNavigate();
  const [listofprojects, setList] = useState(initialprojectlist);
  const [funds, setFunds] = useState(initialFunds);
  AddFunds(username, 0)

  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    hasaddedfunds = false
    navigate('/');
  }

  const handleToSupporterActivity  = () => {
    console.log("Navigating To Supporter Activity (from SLP page) ---------------------")
    hasaddedfunds = false
    navigate('/Supporter_ActivityPage');
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
        //console.log(i)
        if(i>0){
          setList(listofprojects => [...listofprojects, [response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]]])
        }
        else{
          setList(listofprojects => [[response_info[i]["username"], response_info[i]["type"], response_info[i]["story"], response_info[i]["name"], response_info[i]["launched"], response_info[i]["goal"], response_info[i]["funds"], response_info[i]["deadline"]]])
        }}
    //console.log(listofprojects)
  }

  } else {
    console.log("did not receive projects back")
  }
}
};
}


function AddFunds(username, amount) { // Requests List of Projects by the logged in Designer
  if(hasaddedfunds == false){
  hasaddedfunds = true;
  // Creating Lambda Payload
  var data3 = {};
  data3["funds"] = amount;
  data3["username"] = username;
  
  // Wrapping Payload in a "Body"
  var body3 = {}
  body3["body"] = JSON.stringify(data3);
  var js3 = JSON.stringify(body3);

  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", add_funds_url, true);

  console.log('Sending Request to Lambda for updated funds')
  xhr3.send(js3);

  // This will process results and update HTML as appropriate. 
  xhr3.onloadend = function () {
  
  if (xhr3.readyState == XMLHttpRequest.DONE) {
    console.log('Received Data from Lambda')

    var parsed_response3 = JSON.parse(xhr3.responseText);
    //console.log("JSONParse Result :", responseunit)
    var response_info3  = parsed_response3["body"];
    console.log("result : ", response_info3[0]["funds"])
    
    if(response_info3 != undefined){
        setFunds(funds => [response_info3[0]["username"], response_info3[0]["funds"]])
  }

  } else {
    console.log("did not receive funds back")
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
       <center><button onClick={()=>handleToProject(listofprojects[index][0], listofprojects[index][3])} type="submit" className="btn">Go to Project : {listofprojects[index][3]}</button></center><br/>
       </center>
        )}))
}


function displayfunds(){
  console.log("FUNDS : ",funds)
  return(
       <center >
        Your Funds: {funds[1]}<br/>
       <center><button onClick={()=>handleToAddFunds()} type="submit" className="btn">Add Funds : {}</button></center>
       </center>
        )
}

function displaysupporteractivity(){
  return(
       <center>
       <center><button onClick={()=>handleToSupporterActivity()} type="submit" className="btn">Go To Your Activity</button></center><br/>
       </center>
        )
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

const handleToProject  = (developer_name, project_name) => {
  hasloadedprojects = false;
  currentproject.designer = developer_name;
  currentproject.projectname = project_name;

  console.log("Navigating to Project Page", project_name, "(from SLP page) ---------------------")
  hasaddedfunds = false;
  navigate('/Supporter_ProjectPage');
}

const handleToAddFunds  = () => {
  console.log("Navigating back to the Supporter Add Funds Page (from SLP page) ---------------------")
  hasaddedfunds = false;
  navigate('/Supporter_AddFunds');
}




    return (
        <div>
      
          <h1><center>Welcome to the Supporter Home Page!</center></h1>
          <h1><center>You're Logged in as a Supporter</center></h1>

          <center>
          <div className="form">
            <div className="form-body">
              <div className="searchval">
                <label className="form__label" htmlFor="searchval">Search for a Project By Genre or Desription (e.g. project story) Here : </label>
                <input className="form_label" type="text" value={searchval} onChange = {(e) => handleInputChange(e)} id="searchval" placeholder="Game"/>
                <center><button onClick={()=>{SearchGenre(searchval); hasloadedprojects = false;}} type="submit" className="btn">Search</button></center>
              </div>
            </div>
          </div>
          </center>
          {displayfunds()}
          <br/><br/>
          {displaysupporteractivity()}

          {displayprojects()}

          <br/>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>
          </div>
        );
    }


export default Supporter_LandingPage;