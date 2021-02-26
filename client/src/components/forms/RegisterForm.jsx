import React from "react"
import {Form, Input, Select, Submit, Error} from "./FormComponents"

const RegisterForm = ({registerUser, registerError}) => {

  return (
    <Form onSubmit={registerUser} className="sign-container">
      <Input name="name" required />
      <Input name="email" required />
      <Input name="password" type="password" />
      <Input name="confirmPassword" type="password" placeholder="Confirm password" />
      <Select name="role" options={["user", "admin"]} />
      {/*{ registerError && <Error msg={registerError} /> }*/}
      <Error error={registerError} />
      <Submit className="btn-block">Register</Submit>
    </Form>
  )
}

export default RegisterForm
