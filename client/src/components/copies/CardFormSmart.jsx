import React from "react";
import TextGroupForm from "../../forms/TextGroupForm";
import {Form, Error, Input, Submit} from "../../forms/FormComponents";

const CardForm = ({module, setModule, handleSubmit}) => {

  // useEffect(() => {
  //   reset(module.body);
  // }, [module]);

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
    <Form onSubmit={handleSubmit}>
      <Input
        name="title"
        required
        onChange={handleChange}
      />
      <Input
        name="text"
        required
      />
      <Input
        name="img"
        label="image"
        required
      />
      {/*<Error error={authError} />*/}
      <Submit className="btn-block">Save</Submit>
    </Form>
  )
}

export default CardForm;
