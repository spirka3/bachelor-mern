import React, {useState} from "react";
import axios from "axios";
import {Button, ButtonGroup} from "react-bootstrap";
import CardForm from "../forms/CardForm";
import ImageForm from "../forms/ImageForm";

const EditForm = ({module, setModule, setShowModal}) => {

  const [origin, setOrigin] = useState(module);

  const handleChange = (e) => {
    const {value, name} = e.target
    setModule(prevState => {
      return {
        ...prevState,
        body: { ...prevState.body, [name]: value }
      }
    })
  }

  const stepBack = () => console.log('Not implemented')
  const stepForward = () => console.log('Not implemented')
  const reloadModule = () => setModule(origin)
  const close = () => setShowModal(false)

  function onSubmit(data) {
    console.log('submit data', data)

    axios.patch('/modules/'+module._id, {
      ...module,
      body: data
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const ModuleFormBody = () => {
    // called as a function doubt does it mean anything?
    const props = {defaultValues: module.body, handleChange, onSubmit}

    switch(module.type) {
      case "card":  return <CardForm {...props} />
      case "image": return <ImageForm {...props} />
      default:      return <h1>module was not rendered</h1>
    }
  }

  return (
    <>
      <h1>{module.type}</h1>
      {ModuleFormBody()}
      <ButtonGroup variant="light">
        <Button onClick={stepBack}>Back</Button>
        <Button onClick={stepForward}>Forward</Button>
        <Button onClick={reloadModule}>Reload</Button>
        <Button onClick={close}>&times;</Button>
      </ButtonGroup>
    </>
  )
}

export default EditForm