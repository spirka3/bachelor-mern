import Modal from "react-bootstrap/Modal";
import React from "react";

const MyModal = ({title, header, body, footer, style, isDirty, setShowModal}) => {

  const closeModal = () => {
    if (isDirty) {
      console.log('warn to save changes')
    }
    setShowModal(false)
  }

  return (
    <Modal show={true} onHide={closeModal} style={style} centered>
      <Modal.Header closeButton>
        {/*<Modal.Title className="block">*/}
        {/*{title}*/}
        {/*</Modal.Title>*/}
        {header}
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      {footer &&
        <Modal.Footer>
          {footer}
        </Modal.Footer>
      }
    </Modal>
  )
};

export default MyModal