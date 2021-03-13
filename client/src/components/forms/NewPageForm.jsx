import React from "react";
import { Form, Error, Input, Submit, Select } from "./FormComponents";
import axios from "axios";
import { useHistory } from "react-router";
import { Redirect } from "react-router";

const NewPageForm = ({ closeModal }) => {
  const history = useHistory();

  const handleSubmit = (data) => {
    return axios
      .post("/pages", data)
      .then((response) => {
        console.log(response);
        closeModal();
        history.push("/lol");
        // history.push(data.path);
        // history.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="title" required />
      <Input name="path" required />
      <Input name="navbar" />
      <Select name="template" options={["tiles", "blog"]} />
      <Submit className="btn-block">Create</Submit>
    </Form>
  );
};

export default NewPageForm;
