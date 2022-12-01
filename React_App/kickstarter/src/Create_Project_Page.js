import React from "react";
import {useState} from 'react';

// REPLACE URL BELOW WITH YOURS!
var base_url = "https://nv069k0pjd.execute-api.us-east-1.amazonaws.com/Prod/";

var create_url = base_url + "createproject";      // POST: {arg1:5, arg2:7}




function Create_Project_Page(){

  const [project_name, setproject_name] = useState(null);
  const [project_story, setproject_story] = useState(null);
  const [designer_name, setdesigner_name] = useState(null);
  const [project_genre, setproject_genre] = useState(null);
  const [fundraising_goal,setfundraising_goal] = useState(null);
  const [project_deadline,setproject_deadline] = useState(null);


  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "project_name"){
      setproject_name(value);
    }
    if(id === "project_story"){
      setproject_story(value);
    }
    if(id === "designer_name"){
      setdesigner_name(value);
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
  var form = document.addForm;
  var arg1 = project_name;
  var arg2 = project_story;
  var arg3 = designer_name;
  var arg4 = project_genre;
  var arg5 = fundraising_goal;
  var arg6 = project_deadline;

  // my actual payload for arg1/arg2
  var data = {};
  data["arg1"] = arg1;
  data["arg2"] = arg2;
  data["arg3"] = arg3;
  data["arg4"] = arg4;
  data["arg5"] = arg5;
  data["arg6"] = arg6;
  
  // to work with API gateway, I need to wrap inside a 'body'
  var body = {}
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", create_url, true);

  // send the collected data as JSON
  //console.log(js);
  xhr.send(js);

  console.log('Sent Project Informaiton Lambda')
  // This will process results and update HTML as appropriate. 
  
  xhr.onloadend = function () {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    console.log('received a status from lambda function')
    //console.log("response text : ", xhr.responseText);
    //processAddResponse(xhr.responseText);
  } else {
    //processAddResponse("N/A");
  }

};
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
                    <input className="form__input" type="text" value={project_name} onChange = {(e) => handleInputChange(e)} id="project_name" placeholder="The Greatest Game Ever"/>
                </div>
                <div className="project_story">
                    <label className="form__label" htmlFor="project_story"> Project Story : </label>
                    <input  type="text" name="" id="project_story" value={project_story}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Once upon a time.."/>
                </div>
                <div className="designer_name">
                    <label className="form__label" htmlFor="designer_name">Designer (Your) Name :</label>
                    <input  type="text" id="designer_name" className="form__input" value={designer_name} onChange = {(e) => handleInputChange(e)} placeholder="Pat Flanigan"/>
                </div>
                <div className="project_genre">
                    <label className="form__label" htmlFor="project_genre">Project Genre :</label>
                    <input className="form__input" type="project_genre"  id="project_genre" value={project_genre} onChange = {(e) => handleInputChange(e)} placeholder="Games!"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="fundraising_goal">Fundraising Goal :</label>
                    <input className="form__input" type="text" id="fundraising_goal" value={fundraising_goal} onChange = {(e) => handleInputChange(e)} placeholder="Cash Amount"/>
                </div>
                <div className="deadline">
                    <label className="form__label" htmlFor="project_deadline">Project Deadline :</label>
                    <input className="form__input" type="text" id="project_deadline" value={project_deadline} onChange = {(e) => handleInputChange(e)} placeholder="Deadline Date"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>


      </div>
    );
  }


export default Create_Project_Page;