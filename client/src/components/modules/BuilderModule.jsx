import React, {useState} from "react";
import Card from "./Card";
import EditModal from "./modals/EditModal";
import Image from "./Image";
import Button from "react-bootstrap/Button";
import SmallButton from "../buttons/SmallButton";
import {ButtonGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import axios from "axios";

const BuilderModule = ({module, togglePin, onHide, onRemove, showBtn=true}) => {

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
    <div key={module._id}>
      <h1 className="toolbar">Hello, I'm the Toolbar</h1>
      <Module/>
      {showBtn &&
        <ButtonGroup className="w-100">
          <SmallButton className="show-up" onClick={() => setShowModal(true)}>
            Edit
          </SmallButton>
          <SmallButton onClick={togglePin}>
            {/*{pin ? 'Unpin' : 'Pin'}*/}
            Pin
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
          setShowModal={setShowModal}
        />
      }
    </div>
  )
}

export default BuilderModule