import React from "react";
import Form from "react-bootstrap/Form";
import TextGroupForm from "./TextGroupForm";

const ImageForm = ({register}) => {

  return (
    <Form>
      {/* NAME */}
      <TextGroupForm
        label="title"
        name="title"
        register={register}
        required
      />
      {/* PASS */}
      <TextGroupForm
        label="alternative"
        name="alt"
        register={register}
        required
      />
      {/* PASS */}
      <TextGroupForm
        label="Image source"
        name="src"
        register={register}
        required
      />
      {/*{loginError && <ErrorMessage text={loginError}/>}*/}
    </Form>
  )
}

export default ImageForm;
