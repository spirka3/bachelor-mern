import React from "react";
import {Error, Form, Input, Submit} from "./FormComponents";

const UserInfoForm = (props) => {

  return (
    <Form {...props}>
      <Input
        name="name"
        required
      />
      <Input
        name="email"
        required
      />
      <Error error={props.error} />
      <Submit className="btn-block">Save</Submit>
    </Form>
  )
}

export default UserInfoForm
