import React, {useState} from "react";
import Card from "./Card";
import EditModal from "./modals/EditModal";
import Image from "./Image";
import Button from "react-bootstrap/Button";
import SmallButton from "../buttons/SmallButton";
import {ButtonGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import axios from "axios";

const BuilderModule = ({module: m, togglePin, onHide, onRemove, showBtn=true}) => {

  const [module, setModule] = useState(m);
  const [showModal, setShowModal] = useState(false)

  const Module = () => {
    switch(module.type) {
      case "card":
        return <Card id={module._id} body={module.body} />
      case "image":
        return <Image id={module._id} body={module.body} />
      default:
        console.log('module was not rendered', module)
    }
  }

  return (
    <>
      <h1 className="toolbar">Hello, I'm the Toolbar</h1>
      <Module/>
      {showBtn &&
        <ButtonGroup className="w-100">
          <SmallButton className="show-up" onClick={() => setShowModal(true)}>
            Edit
          </SmallButton>
          <SmallButton onClick={togglePin}>
            {module.position.static ? 'Unpin' : 'Pin'}
          </SmallButton>
          <SmallButton onClick={onHide}>
            Hide
          </SmallButton>
          <SmallButton onClick={onRemove}>
            Remove
          </SmallButton>
        </ButtonGroup>
      }
      {showModal &&
        <EditModal
          module={module}
          setModule={setModule}
          setShowModal={setShowModal}
        />
      }
    </>
  )
}

export default BuilderModule