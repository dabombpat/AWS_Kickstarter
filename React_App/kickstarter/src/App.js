import React from "react";
import Login from "./Login.js"
import Designer_LandingPage from "./Designer_LandingPage.js"

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

// if(Lambda returns Something){
//     PageNum = 2
// }
//SendtoALambda()

return(
ChoosePage(PageNum)
)

}


export default App;