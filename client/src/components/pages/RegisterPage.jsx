import React, {useState} from "react";
import {Redirect} from "react-router";
import RegisterForm from "../forms/RegisterForm";
import {setUser} from "../../helpers/functions";
import axios from "axios";

const RegisterPage = () => {

  const [token, setToken] = useState();
  const [registerError, setRegisterError] = useState();

  const registerUser = (data) => {
    axios.post('/auth/register', data)
      .then(response => {
        setToken( _ => {
          setUser(response.data.token)
          return response.data.token
        })
      })
      .catch(err => {
        setRegisterError(err.response.data.msg)
      })
  }

  if (token) {
    return <Redirect to="/"/>
  }
  return <RegisterForm registerUser={registerUser} registerError={registerError} />
};

export default RegisterPage
