import React, {useState} from "react";
import {Redirect} from "react-router";
import LoginForm from "../forms/LoginForm.jsx";
import {getUser} from "../../helpers/functions";
import axios from "axios";

const LoginPage = () => {

  const [loginError, setLoginError] = useState("");


  const login = (data) => {
    axios.post('/auth/login', {
      email: data.email,
      password: data.password
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          localStorage.setItem('token', response.data)
          window.location.reload(false);
        }
      })
      .catch(err => {
        setLoginError(err.response.data.msg)
      })
  }

  if (getUser())
    return <Redirect to="/"/>

  return <LoginForm login={login} loginError={loginError}/>
}

export default LoginPage
