import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router";
import {getAuth, setAuth, reloadPage} from "../../helpers/functions";
import LoginForm from "../forms/LoginForm.jsx";
import RegisterForm from "../forms/RegisterForm";

/** action: login or register */
const AuthPage = ({action}) => {

  const [authError, setAuthError] = useState()

  const handleSubmit = (data) => {
    axios.post(`/auth/${action}`, data)
      .then(response => {
        setAuth(response.data)
        reloadPage()
      })
      .catch(err => {
        setAuthError(err.response.data.message)
      })
  }

  if (getAuth()) {
    return <Redirect to="/"/>
  }

  const props = {
    handleSubmit,
    authError
  }
  return action === 'login' ? <LoginForm {...props} /> : <RegisterForm {...props} />
}

export default AuthPage