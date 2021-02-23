import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {Form, Button, Container} from "react-bootstrap"
import TextGroupForm from "./TextGroupForm";
import {ErrorMessage} from "../others/ErrorMessage";
import axios from "axios";

const RegisterForm = () => {

  const {register, handleSubmit} = useForm()
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    axios.post('/auth/register', {
      name: 'defName',
      email: data.email,
      password: data.password
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    // setUser({name: data.name, pass: data.password})
  }

  return (
    <Container className="sign-container">
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3 align="center">Register</h3>
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
        register={register}
        required
      />
      {/* CONFIRM-PASS */}
      <TextGroupForm
        label="password"
        name="confirm_password"
        register={register}
        required
      />
      {error && <ErrorMessage text={error}/>}
      <Button type="submit" variant="dark" className="btn-block">Register</Button>
    </Form>
    </Container>
  )
}

export default RegisterForm;
