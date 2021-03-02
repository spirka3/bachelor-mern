import React from "react";
import {Error, Form, Input, Submit} from "./FormComponents";

const UserInfoForm = (props) => {

  return (
    <Form {...props}>
      <Input
        label="current password"
        name="password"
        type="password"
        required
      />
      <Input
        label="new password"
        name="newPassword"
        type="password"
        required
      />
      <Input
        label="confirm new password"
        name="confirmPassword"
        type="password"
        required
      />
      <Error error={props.error} />
      <Submit className="btn-block">Save</Submit>
    </Form>
  )
}

export default UserInfoForm
