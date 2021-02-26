import React from "react"
import {Form, Input, Select, Submit, Error} from "./FormComponents"

const RegisterForm = ({handleSubmit, authError}) => {

  return (
    <Form onSubmit={handleSubmit} className="my-form">
      <Input
        name="name"
        required
      />
      <Input
        name="email"
        required
      />
      <Input
        name="password"
        type="password"
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
      />
      <Select
        name="role"
        options={["user", "admin"]}
      />
      <Error error={authError}/>
      <Submit className="btn-block">Register</Submit>
    </Form>
  )
}

export default RegisterForm
