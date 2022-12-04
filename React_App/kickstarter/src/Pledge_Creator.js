import React from "react";
import {useState} from 'react';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { Model } from "./Model";
import currentuser from "./App";


// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";

var project_creator_url = base_url + "pledgecreator";      // ** MAKE SURE THIS IS RIGHT




function Pledge_Creator(){
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

const handleBack  = () => {
  console.log("Navigating back to the Designer Landing Page (from create pledge page) ---------------------")
  navigate('/project_page');
}


  return (
      <div>

          <div className="form">
            <div className="form-body">
            <div className="description">
                    <label className="form__label" htmlFor="description">Pledge Description : </label>
                    <input className="form_label" type="text" value={amount} onChange = {(e) => handleInputChange(e)} id="description" placeholder="A fantastic opportunity!"/>
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
      </div>
    );
  }


export default Pledge_Creator;