import React from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { getAuth } from "../../helpers/functions";
import SmallButton from "../buttons/SmallButton";

const UserModal = ({ showModal, setShowModal, userImage }) => {
  const closeModal = () => setShowModal(false);
  const user = getAuth()?.user;
  console.log(user);
  const Avatar = () => {
    return (
      <Image
        src={userImage}
        style={{ width: "60px", height: "60px", margin: "6px" }}
        rounded
      />
    );
  };

  const LoginUser = () => (
    <Modal.Body>
      <Avatar />
      <Modal.Title>{user.name}</Modal.Title>
      <p>{user.email}</p>
      <SmallButton href="/pages">Pages</SmallButton>
      {user.admin && <SmallButton href="/users">Users</SmallButton>}
      <SmallButton href="/profile">Profile</SmallButton>
      <SmallButton href="/logout">Logout</SmallButton>
    </Modal.Body>
  );

  const LogoutUser = () => (
    <>
      <Modal.Header closeButton>
        <Avatar />
        <Modal.Title>Your are not login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup>
          <Button href="/login">Login</Button>
          <Button href="/register">Register</Button>
        </ButtonGroup>
      </Modal.Body>
    </>
  );

  const style = {
    marginTop: "2.4em",
    position: "fix",
    width: "20%",
    left: "80%",
  };

  return (
    <Modal show={showModal} onHide={closeModal} animation={false} style={style}>
      {user ? <LoginUser /> : <LogoutUser />}
    </Modal>
  );
};

export default UserModal;
