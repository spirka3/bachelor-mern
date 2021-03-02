import React from "react";
import {Form, Input, Submit} from "../../forms/FormComponents";

const CardForm = (props) => {

  const {handleChange: f} = props

  return (
    <Form {...props}>
      <Input
        name="title"
        onChange={f}
      />
      <Input
        name="text"
        onChange={f}
      />
      <Input
        name="img"
        onChange={f}
      />
      <Submit className="btn-block">Save</Submit>
    </Form>
  )
}

export default CardForm;
