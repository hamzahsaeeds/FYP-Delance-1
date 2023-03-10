import React from "react";
import { useState, useContext } from "react";
// import { Context } from "../../Context";
import "../../css/styles.css";
import axios from "axios";
import { InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";



function Login() {

  
  firebase.initializeApp({
    apiKey: "AIzaSyCJLfbdGIbBsTJvIaurEKPdipSXYMxosQA",
    authDomain: "delance-chat-module.firebaseapp.com",
    projectId: "delance-chat-module",
    storageBucket: "delance-chat-module.appspot.com",
    messagingSenderId: "730228602335",
    appId: "1:730228602335:web:be02f0e0a8f55c355d806a",
    measurementId: "G-VEVNBTZZG8"}
  )

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth);


  // const { updateEmail } = useContext(Context);
  const { setUserState } = useContext(UserContext);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { loginState: res } = await axios.post(url, loginState);

      setUserState(true);
      sessionStorage.setItem("login", true);
      // console.log("after local storage..!");
      window.location = "/show-jobs";
      // navigate('/homepage')
      console.log(res.message);
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="main__div">
      <div className="left-image">
        <img src="./login.png" alt="can't load!" />
      </div>
      <div className="login-form">
        <>
          <div className="heading">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span>
              <h1>Delance</h1>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            {/* {JSON.stringify(loginState)}; */}
            <InputGroup className="mb-3" id="input">
              <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
              <FormControl
                placeholder="Email"
                aria-label="email"
                aria-describedby="basic-addon2"
                type="email"
                onChange={(e) => {
                  const value = e.target.value;
                  // console.log(value);
                  setLoginState({ ...loginState, email: value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3" id="input">
              <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
              <FormControl
                placeholder="****"
                aria-label="password"
                aria-describedby="basic-addon2"
                type="password"
                onChange={(e) => {
                  const value = e.target.value;
                  // console.log(value);
                  setLoginState({ ...loginState, password: value });
                }}
              />
            </InputGroup>
            <div className="md-3" id="btn-signin">
              <button
                type="submit"
                className="md-6  btn btn-success"
                disabled={!loginState.email || !loginState.password}
              >
                Sign in
                {/* {sessionStorage.setItem("login", true)} */}
              </button>
            </div>
            
          </form>
          {error}
          <div className="no-account">
            <p>
              Don't have an account?
              <Link to="/signup" id="link">
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
          <div className="md-6" id="btn-signin">
              <button
                onClick={() => {
                  const provider = new firebase.auth.GoogleAuthProvider();
                  auth.signInWithPopup(provider);
                }
                }
                className="md-3  btn btn-primary"
              >
                Sign in with Google
                {/* {sessionStorage.setItem("login", true)} */}
              </button>
            </div>
        </>
      </div>
    </div>
  );
}

export default Login;
