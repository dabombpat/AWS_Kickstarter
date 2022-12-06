import React, { useState } from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { currentuser } from "./App";


var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";
var adminlister_url = base_url + "adminlister";      // POST: {arg1:5, arg2:7}
let initialprojectlist = [];
let hasloadedprojects = false;


function Supporter_LandingPage(){
  let username = currentuser.user
  console.log(username)
  const navigate = useNavigate();

  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    navigate('/');
  }


    return (
        <div>
      
          <h1><center>Welcome to the Supporter Home Page!</center></h1>
          <h1><center>You're Logged in as a Supporter</center></h1>


          <br/>
          <center><button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button></center>
          </div>

          
        );
    }


export default Supporter_LandingPage;