import React from "react";
import {Form, Input, Submit} from "../../forms/FormComponents";

const ImageForm = (props) => {

  const {handleChange: f} = props

  return (
    <Form {...props}>
      <Input
        name="title"
        onChange={f}
      />
      <Input
        label="alternative"
        name="alt"
        required
        onChange={f}
      />
      <Input
        label="Image source"
        name="src"
        required
        onChange={f}
      />
      <Submit className="btn-block">Save</Submit>
    </Form>
  )
}

export default ImageForm;
