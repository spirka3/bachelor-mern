import React, { useState } from "react";
import axios from "axios";
import { getAuth, setAuth, reloadPage } from "../helpers/functions";
import LoginForm from "../components/forms/LoginForm.jsx";
import RegisterForm from "../components/forms/RegisterForm";
import { Redirect } from "react-router";

/** pathname: /login or /register */
const AuthPage = ({ location: { pathname, state } }) => {
  const [authError, setAuthError] = useState();

  if (getAuth()) {
    if (state?.from) {
      return <Redirect to={state.from} />;
    }
    return <Redirect to="/" />;
  }

  const handleSubmit = (data) => {
    axios
      .post("/auth" + pathname, data)
      .then((response) => {
        setAuth(response.data);
        reloadPage();
      })
      .catch((err) => {
        setAuthError(err.response.data.message);
      });
  };

  const props = { handleSubmit, authError };

  return pathname === "/login" ? (
    <LoginForm {...props} />
  ) : (
    <RegisterForm {...props} />
  );
};

export default AuthPage;
