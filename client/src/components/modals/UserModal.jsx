import React, {useState} from "react";
import {Button, ButtonGroup, Modal} from "react-bootstrap";
import {Image, Form} from 'react-bootstrap';
import UserAvatar from "../others/UserAvatar";
import {getUser} from "../../helpers/functions";

const UserModal = ({showModal, setShowModal, userImage}) => {

  const closeModal = () => setShowModal(false);
  const user = getUser();

  const handleClick = () => {
    console.log("clg")
  }

  const Avatar = () => {
    return (
      // <UserAvatar
      //   src={userImage}
      //   onClick={handleClick}
      //   style={{width:"60px", height:"60px", margin: "6px"}}
      // />
      <Image src={userImage} rounded onClick={handleClick} style={{width:"60px", height:"60px", margin: "6px"}}/>
    )
  }

  const [swt, setSwt] = useState(true);

  const Toggle = () => {
    return (
      <Form.Check custom type="switch">
        <Form.Check.Input isInvalid checked={swt} />
        <Form.Check.Label onClick={() => setSwt(!swt)}>
          {`${swt}`}
        </Form.Check.Label>
      </Form.Check>
    )  
  }

  const LoginUser = () => {
    return (
      <>
        <Modal.Header closeButton>
          <Avatar/>
          <Modal.Title>Your Name</Modal.Title>
          <Toggle/>
        </Modal.Header>
        <Modal.Body>
          <Button href="/admin" className={"mb-2 btn-block"}>Administration</Button>
          <ButtonGroup className={"btn-block"} size={"sm"}>
            <Button href="/profile-settings" className={"mr-1"}>Profile settings</Button>
            <Button href="/logout">Log out</Button>
          </ButtonGroup>
        </Modal.Body>
      </>
    )
  }

  const LogoutUser = () => {
    return (
      <>
        <Modal.Header closeButton>
          <Avatar/>
          <Modal.Title>Your are not login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonGroup>
            <Button href="/login">Login</Button>
            <Button href="/register">Register</Button>
          </ButtonGroup>
        </Modal.Body>
      </>
    )
  };

  const style = {
    marginTop: "2.4em",
    position: "fix",
    width: "20%",
    left: "80%"
  }

  return (
    <Modal show={showModal} onHide={closeModal} animation={false} style={style}>
      { user !== null
        ? <LoginUser/>
        : <LogoutUser/>
      }
    </Modal>
  )
}

export default UserModal;
