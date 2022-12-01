import React from "react";
import Login from "./Login.js"
import Designer_LandingPage from "./Designer_LandingPage.js"
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create_Project_Page from "./Create_Project_Page.js";
import Admin_LandingPage from "./Admin_LandingPage.js";

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod";
var add_url = base_url + "hello";      // POST: {arg1:5, arg2:7}



function ChoosePage(PageNum){
if(PageNum == 1){
    return <Login/>
}


if(PageNum == 2){
    return <Designer_LandingPage/>
}
}





function App(){


let PageNum = 1


return(
<main>
    <Routes>
        <Route path="/"  element={<Login/>} exact/>
        <Route path="/designer_landing" element={<Designer_LandingPage/>} />
        <Route path="/create_project" element={<Create_Project_Page/>} />
        <Route path="/admin_landing" element={<Admin_LandingPage/>} />
    </Routes>
</main>
/* <Route path="/shop" component={Shop} /> */
)
}
export default App;