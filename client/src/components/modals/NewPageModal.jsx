import React from "react";
import { Modal } from "react-bootstrap";
import NewPageForm from "../forms/NewPageForm"; // TODO replace

const NewPageModal = ({ closeModal }) => {
  return (
    <Modal show={true} onHide={closeModal} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Create new page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewPageForm closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export default NewPageModal;
