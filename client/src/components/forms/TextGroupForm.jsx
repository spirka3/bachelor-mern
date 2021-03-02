import React from "react";
import {Form} from "react-bootstrap";
import {upperFirst} from "lodash";

const TextGroupForm = ({key, label, name, placeholder, register, required, type, onChange, autoFocus}) => {

  placeholder = placeholder ? placeholder : `Enter ${label}`
  type = type ? type : "text"

  return (
    <Form.Group className="form-group" key={key}>
      <Form.Label>{upperFirst(label)}</Form.Label>
      <Form.Control

        name={name}
        type={type}
        placeholder={placeholder}
        ref={register}
        required={required}
        onChange={onChange}
        // autoFocus={autoFocus}
      />
    </Form.Group>
  )
};

export default TextGroupForm;
