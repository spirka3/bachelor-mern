import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button, Container} from "react-bootstrap";
import {ErrorMessage} from "../others/ErrorMessage";
import {setUser} from "../../helpers/functions";
import TextGroupForm from "./TextGroupForm";

const LoginForm = ({login, loginError}) => {

  const {register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    login(data);
  }

  return (
    <Container className="sign-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 align="center">Login</h3>
        {/* NAME */}
        <TextGroupForm
          label="email"
          name="email"
          register={register}
          required
        />
        {/* PASS */}
        <TextGroupForm
          label="password"
          name="password"
          type="password"
          register={register}
          required
        />
        {loginError && <ErrorMessage text={loginError}/>}
        <Button type="submit" variant="dark" className="btn-block">Login</Button>
      </Form>
    </Container>
  )
}

export default LoginForm;
