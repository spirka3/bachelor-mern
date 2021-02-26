import React from "react";
import Form from "react-bootstrap/Form";
import TextGroupForm from "./TextGroupForm";

const CardForm = (props) => {

  const {register, setModule, setIsDirty} = props

  const handleChange = (e) => {
    const {value, name} = e.target
    setModule(prevState => {
      return {
        ...prevState,
        body: {
          ...prevState.body,
          [name]: value
        }
      }
    })
  }

  return (
    <Form onChange={setIsDirty(true)}>
      {/* TITLE */}
      <TextGroupForm
        label="title"
        name="title"
        register={register}
        required
        // onChange={handleChange}
      />
      {/* TEXT */}
      <TextGroupForm
        label="text"
        name="text"
        register={register}
        required
        // onChange={handleChange}
      />
      {/* IMAGE */}
      <TextGroupForm
        label="image"
        name="img"
        register={register}
        required
        // onChange={handleChange}
      />
      {/* STYLE */}
      {/*<TextGroupForm*/}
      {/*  label="style"*/}
      {/*  name="style"*/}
      {/*  register={register}*/}
      {/*  required*/}
      {/*/>*/}
      {/*{loginError && <ErrorMessage text={loginError}/>}*/}
    </Form>
  )
}

export default CardForm;
