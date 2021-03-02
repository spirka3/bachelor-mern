import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextGroupForm from "../../forms/TextGroupForm";

const CardForm = ({setModule, onSubmit}) => {

  const { handleSubmit, control } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)}>

      <Controller
        as={TextGroupForm}
        control={control}
        name="TextField"
        defaultValue=""
      />

      <Controller
        control={control}
        name="title"
        render={({ onChange, onBlur, value }) => (
          <TextGroupForm
            label="title"
            name="title"
            required
            onChange={handleChange}
            // onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <input type="submit" />
    </form>
  )
}

export default CardForm;
