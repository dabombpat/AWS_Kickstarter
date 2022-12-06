// JACKS WORKING BRANCH

import React from "react";
import Login from "./Login.js"
import Designer_LandingPage from "./Designer_LandingPage.js"
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Designer_Create_Project from "./Designer_Create_Project.js";
import Admin_LandingPage from "./Admin_LandingPage.js";
import Model from "./Model.js";
import Designer_ProjectPage from "./Designer_ProjectPage.js";
import Designer_Create_Pledge from "./Designer_Create_Pledge";
import Supporter_LandingPage from "./Supporter_LandingPage";
import Supporter_ProjectPage from "./Supporter_ProjectPage";


var currentuser = new Model("","")
export {currentuser}

var currentproject = new Model("","")
export {currentproject}


function App(){


return(
<main>
    <Routes>
        <Route path="/"  element={<Login/>} exact/>
        <Route path="/Designer_ProjectPage" element={<Designer_ProjectPage/>} />
        <Route path="/Designer_LandingPage" element={<Designer_LandingPage/>} />
        <Route path="/Designer_Create_Project" element={<Designer_Create_Project/>} />
        <Route path="/Admin_LandingPage" element={<Admin_LandingPage/>} />
        <Route path="/Designer_Create_Pledge" element={<Designer_Create_Pledge/>} />
        <Route path="/Supporter_LandingPage" element={<Supporter_LandingPage/>} />
        <Route path="/Supporter_ProjectPage" element={<Supporter_ProjectPage/>} />
    </Routes>
</main>
)
}
export default App;