import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import currentuser from './App';
import currentproject from './App';


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var add_funds_url = base_url + "addfunds";
let initialFunds = [];
let hasaddedfunds = false;


function Supporter_AddFunds(){
  let username = currentuser.user
  console.log("USERNAME : ", username)
  const navigate = useNavigate();
  const [funds, setFunds] = useState(initialFunds);
  AddFunds(currentuser.user, 0)

  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    navigate('/');
  }

  const [amountofcash, setamountofcash] = useState(null);
  
  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "amountofcash"){
      setamountofcash(value);
    }
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



function displayfunds(){
  console.log("FUNDS : ",funds)
  return(
       <center >
        You currently have in your account: {funds[1]}<br/>
       </center>
        )
}



    return (
        <div>
      
          <h1><center>Welcome to the Supporter Add Funds Page!</center></h1>
          <h1><center>You can add funds here</center></h1>

          <center>
          <div className="form">
            <div className="form-body">
              <div className="amountofcash">
                <label className="form__label" htmlFor="amountofcash">Add Funds to your account here : </label>
                <input className="form_label" type="text" value={amountofcash} onChange = {(e) => handleInputChange(e)} id="amountofcash" placeholder="$5000"/>
                <center><button onClick={()=>{hasaddedfunds = false; AddFunds(username, amountofcash)}} type="submit" className="btn">Add Funds</button></center>
              </div>
            </div>
          </div>
          </center>
          {displayfunds()}
          <br/><br/>


          <br/>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>
          </div>
        );
    }


export default Supporter_AddFunds;