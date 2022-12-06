import React from "react";
import {useState} from 'react';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { Model } from "./Model";
import currentuser from "./App";
import currentproject from "./App";

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var pledge_creator_url = base_url + "pledgecreator";


function Designer_Create_Pledge(){
  let username = currentuser.user;
  //console.log("USER Username is : ", username)
  const navigate = useNavigate();
  
  const [reward, setReward] = useState(null);
  const [amount, setAmount] = useState(null);
  const [max_supporters, setSupporters] = useState(null);
  const [description, setDescription] = useState(null);


  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "description"){
      setDescription(value);
    }
    if(id === "reward"){
      setReward(value);
    }
    if(id === "amount"){
      setAmount(value);
    }
    if(id === "max_supporters"){
      setSupporters(value);
    }
  
}

function SendtoPledgeCreator(description, reward, amount, max_supporters) {
  // Creating Payload to send to Lambda
  var data = {};
  data["projectname"] = currentproject.projectname; //  -------------------------------------------THIS NEEDS TO BE FIXED
  data["reward"] = reward;
  data["amount"] = amount;
  data["maxsupporters"] = max_supporters;
  console.log(data)
  
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", pledge_creator_url, true);

  // send the collected data as JSON
  //
  console.log(js);
  xhr.send(js);

  console.log('Sent Project Informaiton Lambda')
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    console.log('received a status from lambda function')
    //console.log("response text : ", xhr.responseText);
    if(xhr.status == 200){alert('Sucessfully Registered Pledge!');}
    //processAddResponse(xhr.responseText);
  } else {
    //processAddResponse("N/A");
  }

};
}






const handleSubmit  = () => {
  alert("Attempting to create a pledge!");
  SendtoPledgeCreator(description,reward,amount,max_supporters);
}

const handleBack  = () => {
  console.log("Navigating back to the Designer Landing Page (from create pledge page) ---------------------")
  navigate('/Designer_ProjectPage');
}


  return (
      <div>

          <div className="form">
            <div className="form-body">
            <div className="description">
                    <label className="form__label" htmlFor="description">Pledge Description : </label>
                    <input className="form_label" type="text" value={description} onChange = {(e) => handleInputChange(e)} id="description" placeholder="A fantastic opportunity!"/>
                </div>
                <div className="amount">
                    <label className="form__label" htmlFor="amount">Pledge Amount : </label>
                    <input className="form_label" type="text" value={amount} onChange = {(e) => handleInputChange(e)} id="amount" placeholder="250"/>
                </div>
                <div className="reward">
                    <label className="form__label" htmlFor="reward">Pledge Reward : </label>
                    <input className="form_label" type="text" value={reward} onChange = {(e) => handleInputChange(e)} id="reward" placeholder="A Custom Plaque"/>
                </div>
                <div className="max_supporters">
                    <label className="form__label" htmlFor="max_supporters"> Max Number of Supporters : </label>
                    <input  type="form_label" name="" id="max_supporters" value={max_supporters}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="5"/>
                </div>
              </div>
            </div>
            <button onClick={()=>handleBack()} type="submit" className="btn">Back</button>
            <button onClick={()=>handleSubmit()} type="submit" className="btn">Create Pledge</button>
      </div>
    );
  }


export default Designer_Create_Pledge;