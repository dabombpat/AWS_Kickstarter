import './App.css';
import React from 'react';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">

  //     <h1><center>Welcome to Kickstarter!</center></h1>
  //     <h1><center>Login or Register Here</center></h1>

  //     <form>
  //       <label>
  //         Name:
  //         <input name="LoginForm" method="post"/>
  //       </label>
  //       <center><p>Please enter your username and password below:</p></center>

  //       <center>
  //         <input type="text" placeholder="Username" />
  //         <input type="text" placeholder="Password" />
  //       </center>

  //       <center><input type="button" value="Login" onclick="JavaScript:handleAddClick(this)"/></center>
  //       <center><input type="button" value="Register" onclick="JavaScript:handleEqualClick(this)"/></center>
  //     </form>
  //     return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label>
  //         Name:
  //         <input type="text" value={this.state.value} onChange={this.handleChange} />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //   );

  //     </header>
  //   </div>
  // );
  


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  function handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
    console.log(email)
    console.log(password)
    //TODO: check DB for credentials
  }


  return (
  <div>

    <h1><center>Welcome to Kickstarter!</center></h1>
    <h1><center>Login or Register Here</center></h1>





    <center><form onSubmit={handleSubmit}>
    <br/>
    
    <label>
        Username:
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <br/>
      <label>
        Password:
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <br/>
      <input type="submit" value="Submit" />

    </form></center>

    </div>
  );
}

export default App;
