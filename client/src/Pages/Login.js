import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignupModal from "./SignupModal";
import "../Style/styles.css";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import {MdEmail} from "react-icons/md";
import {MdLock} from "react-icons/md";


const Login = () =>  {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");
    const [username, setUserName] = useState([]);
    const [password, setPassword] = useState([]);

    const errors = {
      pass: "Invalid username or password"
    };

  const loginUser=(event)=>{
    event.preventDefault();
    Axios.post("/login",{
      username:username, 
      password:password
    }).then((response)=>{
      if(response.data.length==0){
        setIsSubmitted(false);
        localStorage.setItem("isSubmitted", false);
        setErrorMessages({ name: "pass", message: errors.pass });
      } else{
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("access", response.data[0].access_lvl)
        setIsSubmitted(true);
        localStorage.setItem("isSubmitted", true);
        switch(response.data[0].access_lvl){
          case 1:
            window.location.href = '/studenthomepage';
            break;
          case 2:
            window.location.href = '/agencyhomepage';
            break;
          case 3:
            window.location.href = '/adminhomepage';
            break;
          default:
            window.location.href = '/';
        }
      }
    });
};
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );


  
    // JSX code for login form
    const renderForm = (
      <div className="form">
        <form onSubmit={loginUser}>
          <div className="input-container">
            <label>Username </label>
            <input type="email" name="uname" required onChange={(e)=>{
              setUserName(e.target.value);
            }}/>
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required
            onChange={(e)=>{
              setPassword(e.target.value);
            }}/>
            {renderErrorMessage("pass")}
          </div>
          <Button variant="primary" as="input" type="submit" value="Login" />{' '}
          <div className="forgotPassword">
            <a href="/forgotpassword">Forgot Password?</a>
          </div>
          <div className="agencyForm">
            <a href="/agencyaccountrequest">Agency Verification Form</a>
          </div>
          <br/>
          <div class="col-md-12 text-center">
            <Button variant="success" className="signUp" onClick={() => setModalShow(true)}>Sign Up</Button>
          </div>
        </form>
      </div>
    );
    return (
        <div className="app">
          <div className="flex-item slogan">
              <div className="sloganTitle">Smart Placement </div>
              <div className="sloganStatement">We help you with all your placement needs. </div>
          </div>
          <div className="flex-item login-form">
              {renderForm}
          </div>
          <SignupModal show={modalShow} onHide={() => setModalShow(false)}/>
          <div>{loginStatus}</div>
        </div>
    );
}
export default Login
