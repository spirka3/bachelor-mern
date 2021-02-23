import {Button, Form, Modal} from "react-bootstrap";
import React from "react";
import {useForm} from "react-hook-form";
import TextGroupForm from "../../forms/TextGroupForm";
import {card_module, image_module} from "../../../helpers/data";

const BuilderModal = ({moduleType, modules, setModules, showModal, setShowModal}) => {

  const {register, handleSubmit} = useForm();

  const closeModal = () => setShowModal(false);

  const onSubmit = (data) => {
    console.log("submit")
    setModules([...modules, {...data, type: moduleType}])
    closeModal();
  }

  const renderTextGroupForm = ({label, name, required}) => {
    return (
      <TextGroupForm
        label={label}
        name={name}
        register={register}
        required={required}
      />
    )
  }

  const AccurateForm = () => {
    // TODO
    switch (moduleType) {
      case "card":
        return (
          <>
            {card_module.map(renderTextGroupForm)}
          </>
        )
      case "image":
        return (
          <>
            {image_module.map(renderTextGroupForm)}
          </>
        )
      default:
        console.log("modal was not rendered")
        console.log(moduleType)
    }
  }

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AccurateForm/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" type="submit" onClick={handleSubmit(onSubmit)}>Save</Button>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BuilderModal