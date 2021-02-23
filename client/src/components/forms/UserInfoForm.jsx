import React from "react";
import {useForm} from "react-hook-form";
import {Form, Button} from "react-bootstrap";
import {setUser} from "../../helpers/functions";
import TextGroupForm from "./TextGroupForm";

const UserInfoForm = () => {

  const {register, handleSubmit} = useForm()

  const saveEmail = (data) => {
    // TODO saveIntoDB
    setUser({name: data.name, pass: data.pass})
  }

  return (
    <Form onSubmit={handleSubmit(saveEmail)}>
      {/* NAME */}
      <TextGroupForm
        label="new name"
        name="name"
        register={register}
        required={true}
      />
      <Button type="submit" variant="dark" className="btn-block">
        Save name
      </Button>
    </Form>
  )
}

export default UserInfoForm
