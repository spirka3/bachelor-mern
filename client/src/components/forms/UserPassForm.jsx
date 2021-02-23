import React from "react";
import {useForm} from "react-hook-form";
import {Form, Button} from "react-bootstrap";
import {setUser} from "../../helpers/functions";
import TextGroupForm from "./TextGroupForm";

const UserPassForm = () => {

  const {register, handleSubmit} = useForm();

  const savePass = (data) => {
    // TODO saveIntoDB
    setUser({name: data.name, pass: data.password})
  }

  return (
    <Form>
      {/* NEW PASS */}
      <TextGroupForm
        label="new password"
        name="password"
        type="password"
        register={register}
        required={true}
      />
      {/* CONFIRM-PASS */}
      <TextGroupForm
        label="new password"
        name="password"
        type="password"
        register={register}
        required={true}
      />
      <Button type="submit" variant="dark" className="btn-block" onClick={handleSubmit(savePass)}>
        Save pass
      </Button>
    </Form>
  )
}

export default UserPassForm;
