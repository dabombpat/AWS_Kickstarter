// JACKS WORKING BRANCH

import React from "react";
import Login from "./Login.js"
import Designer_LandingPage from "./Designer_LandingPage.js"
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create_Project_Page from "./Create_Project_Page.js";
import Admin_LandingPage from "./Admin_LandingPage.js";
import Model from "./Model.js";
import Project_LandingPage from "./Project_LandingPage.js";
import Pledge_Creator from "./Pledge_Creator";



var currentuser = new Model("","")
export {currentuser}

var currentproject = new Model("","")
export {currentproject}


function App(){


return(
<main>
    <Routes>
        <Route path="/"  element={<Login/>} exact/>
        <Route path="/project_page" element={<Project_LandingPage/>} />
        <Route path="/designer_landing" element={<Designer_LandingPage/>} />
        <Route path="/create_project" element={<Create_Project_Page/>} />
        <Route path="/admin_landing" element={<Admin_LandingPage/>} />
        <Route path="/pledge_creator" element={<Pledge_Creator/>} />
    </Routes>
</main>
)
}
export default App;