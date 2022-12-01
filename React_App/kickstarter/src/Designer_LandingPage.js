import React from "react";
import {Link, redirect, Routes, Route, useNavigate, Navigation} from 'react-router-dom';
import anewuser from "./Login";

function Designer_LandingPage(){
  const navigate = useNavigate();


  //console.log("AHHHHHH : " , anewuser.getEmail())

  function Create_Project(){
  
    console.log("Create Project!")
    
    navigate('/create_project');
    
  }
  
    return (
        <div>
      
          <h1><center>Welcome to the Designer Landing Page!</center></h1>
          <h1><center>You've Logged in!</center></h1>

          <br/>
          <h5><center>I need to put a list of projects here</center></h5>

          <center><button onClick={Create_Project}>Create A Project</button></center>

          </div>

          
        );
    }


export default Designer_LandingPage;