import {Button, Form, Image, Modal} from "react-bootstrap";
import React from "react";
import {useForm} from "react-hook-form";
import {image_module} from "../../helpers/data";
import TextGroupForm from "../forms/TextGroupForm";

const ImageModal = ({setModules, showModal, setShowModal}) => {

  const {register, handleSubmit} = useForm();

  const closeModal = () => setShowModal(false);

  function onSubmit(data) {
    console.log("submit")
    setModules(prevState => ([...prevState, data]))
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

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Image src="https://picsum.photos/400"/>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {image_module.map(renderTextGroupForm)}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit(onSubmit)}>Save</Button>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ImageModal;