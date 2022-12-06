import React from "react";
import {useState} from 'react';
import {Link, redirect, Routes, Route, useNavigate} from 'react-router-dom';
import { Model } from "./Model";
import currentuser from "./App";


// REPLACE URL BELOW WITH YOURS!
var base_url = "https://sbjoexsw53.execute-api.us-east-1.amazonaws.com/Prod/";

var project_creator_url = base_url + "projectcreator";      // POST: {arg1:5, arg2:7}




function Create_Project_Page(){
  let username = currentuser.user;
  //console.log("USER Username is : ", username)

  const [project_name, setproject_name] = useState(null);
  const [designer_name, setdesigner_name] = useState(null);
  const [project_story, setproject_story] = useState(null);
  const [project_genre, setproject_genre] = useState(null);
  const [fundraising_goal,setfundraising_goal] = useState(null);
  const [project_deadline,setproject_deadline] = useState(null);


  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "project_name"){
      setproject_name(value);
    }
    if(id === "designer_name"){
      setdesigner_name(value);
    }
    if(id === "project_story"){
      setproject_story(value);
    }
    if(id === "project_genre"){
      setproject_genre(value);
    }
    if(id === "fundraising_goal"){
      setfundraising_goal(value);
    }
    if(id === "project_deadline"){
      setproject_deadline(value);
  }
  
}

function SendtoALambda(project_name, project_story, designer_name, project_genre, fundraising_goal, project_deadline) {
  // Creating Payload to send to Lambda
  var data = {};
  data["username"] = currentuser.user;
  data["name"] = project_name;
  data["nickname"] = designer_name;
  data["story"] = project_story;
  data["type"] = project_genre;
  data["goal"] = fundraising_goal;
  data["funds"] = 0;
  data["deadline"] = project_deadline;
  data["launched"] = false;
  
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", project_creator_url, true);

  // send the collected data as JSON
  //
  //console.log(js);
  xhr.send(js);

  console.log('Sent Project Informaiton Lambda')
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    console.log('received a status from lambda function')
    //console.log("response text : ", xhr.responseText);
    if(xhr.status == 200){alert('Sucessfully Registered Project!');}
    //processAddResponse(xhr.responseText);
  } else {
    //processAddResponse("N/A");
  }

};
}

const navigate = useNavigate();

const handleBack  = () => {
  console.log("Navigating back to the Designer Landing Page (from create project page) ---------------------")
  navigate('/Designer_LandingPage');
}

const handleSubmit  = () => {
  console.log(project_name,project_story,designer_name,project_genre,fundraising_goal,project_deadline);
  SendtoALambda(project_name,project_story,designer_name,project_genre,fundraising_goal,project_deadline);
}


  return (
      <div>
        
        <div className="form">
            <div className="form-body">
                <div className="project_name">
                    <label className="form__label" htmlFor="project_name">Project Name : </label>
                    <input className="form_label" type="text" value={project_name} onChange = {(e) => handleInputChange(e)} id="project_name" placeholder="The Greatest Game Ever"/>
                </div>
                <div className="designer_name">
                    <label className="form__label" htmlFor="designer_name">Designer Name : </label>
                    <input className="form_label" type="text" value={designer_name} onChange = {(e) => handleInputChange(e)} id="designer_name" placeholder="Pat Flan"/>
                </div>
                <div className="project_story">
                    <label className="form__label" htmlFor="project_story"> Project Story : </label>
                    <input  type="form_label" name="" id="project_story" value={project_story}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Once upon a time.."/>
                </div>
                <div className="project_genre">
                    <label className="form__label" htmlFor="project_genre">Project Genre :</label>
                    <input className="form_label" type="project_genre"  id="project_genre" value={project_genre} onChange = {(e) => handleInputChange(e)} placeholder="Games!"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="fundraising_goal">Fundraising Goal :</label>
                    <input className="form_label" type="text" id="fundraising_goal" value={fundraising_goal} onChange = {(e) => handleInputChange(e)} placeholder="Cash Amount"/>
                </div>
                <div className="deadline">
                    <label className="form__label" htmlFor="project_deadline">Project Deadline :</label>
                    <input className="form_label" type="text" id="project_deadline" value={project_deadline} onChange = {(e) => handleInputChange(e)} placeholder="Deadline Date"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
                <button onClick={()=>handleBack()} type="submit" className="btn">Back</button>
            </div>
        </div>


      </div>
    );
  }


export default Create_Project_Page;