import React from "react";
import Login from "./Login.js"
import Designer_LandingPage from "./Designer_LandingPage.js"
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://nv069k0pjd.execute-api.us-east-1.amazonaws.com/Prod/";
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
        <Route path="/landing" element={<Designer_LandingPage/>} />
    </Routes>
</main>
/* <Route path="/shop" component={Shop} /> */
)
}
export default App;