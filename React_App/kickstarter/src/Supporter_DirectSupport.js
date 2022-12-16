import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import currentuser from './App';
import currentproject from './App';


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var add_funds_url = base_url + "directsupport";
let initialsupport = [];
let hassupported = false;


function Supporter_DirectSupport(){
  let username = currentuser.user
  const navigate = useNavigate();

  const handleBackToLandingPage  = () => {
    console.log("Navigating back to the Project Page Page (from SDS page) ---------------------")
    navigate('/Supporter_ProjectPage');
  }

  const [amountofcash, setamountofcash] = useState(null);
  
  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "amountofcash"){
      setamountofcash(value);
    }
}


function DirectSupport(username, projectname, amount) { // Requests List of Projects by the logged in Designer
  if(hassupported == false){
    hassupported = true;
  // Creating Lambda Payload
  var data = {};
  data["username"] = username;
  data["projectname"] = projectname;
  data["amount"] = amount;
  
  // Wrapping Payload in a "Body"
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", add_funds_url, true);

  console.log('Sending Request to Lambda for updated funds')
  xhr.send(js);

  // This will process results and update HTML as appropriate. 
  xhr.onloadend = function () {
  
  if (xhr.readyState == XMLHttpRequest.DONE) {
    console.log('Received Data from Lambda')

    var parsed_response = JSON.parse(xhr.responseText);
    //console.log("JSONParse Result :", responseunit)
    var response_info  = parsed_response["body"];
    console.log("result : ", response_info)
    alert('attempting to deposit direct support')

  } else {
    console.log("did not receive funds back")
  }
}
};
}





    return (
        <div>
      
          <h1><center>Welcome to the Supporter Add Funds Page!</center></h1>
          <h1><center>You can add funds here</center></h1>

          <center>
          <div className="form">
            <div className="form-body">
              <div className="amountofcash">
                <label className="form__label" htmlFor="amountofcash">Directly Support this project here : </label>
                <input className="form_label" type="text" value={amountofcash} onChange = {(e) => handleInputChange(e)} id="amountofcash" placeholder="$5000"/>
                <center><button onClick={()=>{hassupported = false; DirectSupport(username, currentproject.projectname, amountofcash)}} type="submit" className="btn">Support!</button></center>
              </div>
            </div>
          </div>
          </center>
          <br/><br/>


          <br/>
          <center><button onClick={()=>handleBackToLandingPage()} type="submit" className="btn">Back To Home Page</button></center>
          </div>
        );
    }


export default Supporter_DirectSupport;