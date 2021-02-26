import React from "react"
import {Form, Error, Input, Submit} from "./FormComponents"

const LoginForm = ({handleSubmit, authError}) => {

  return (
    <Form onSubmit={handleSubmit} className="my-form">
      <Input
        name="email"
        required
      />
      <Input
        name="password"
        type="password"
      />
      <Error error={authError} />
      <Submit className="btn-block">Login</Submit>
    </Form>
  )
}

export default LoginForm
