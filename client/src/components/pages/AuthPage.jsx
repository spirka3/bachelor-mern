import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router";
import {getUser, setUser, reloadPage} from "../../helpers/functions";
import LoginForm from "../forms/LoginForm.jsx";
import RegisterForm from "../forms/RegisterForm";

/** action: login or register */
const AuthPage = ({action}) => {

  const [authError, setAuthError] = useState()

  const handleSubmit = (data) => {
    axios.post(`/auth/${action}`, data)
      .then(response => {
        setUser(response.data)
        reloadPage()
      })
      .catch(err => {
        setAuthError(err.response.data.msg)
      })
  }

  if (getUser()) {
    return <Redirect to="/"/>
  }

  const props = {
    handleSubmit,
    authError
  }
  return action === 'login' ? <LoginForm {...props} /> : <RegisterForm {...props} />
}

export default AuthPage