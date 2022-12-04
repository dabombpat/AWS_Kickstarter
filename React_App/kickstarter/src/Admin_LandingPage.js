import React from "react";
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';



function Admin_LandingPage(){
  const navigate = useNavigate();
  const handleBackToLogin  = () => {
    console.log("Navigating back to the Login Page (from ALP page) ---------------------")
    navigate('/');
  }


    return (
        <div>
      
          <h1><center>Welcome to the Admin Landing Page!</center></h1>
          <h1><center>You've Logged in!</center></h1>

          <br/>
          <h5><center>I need to put a list of projects here</center></h5>
          <button onClick={()=>handleBackToLogin()} type="submit" className="btn">Back To Login</button>
          </div>

          
        );
    }


export default Admin_LandingPage;