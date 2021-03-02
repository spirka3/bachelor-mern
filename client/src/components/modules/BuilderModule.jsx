import React, {useState} from "react"
import Card from "./Card"
import Image from "./Image"
import SmallButton from "../buttons/SmallButton"
import {ButtonGroup, Col, Row} from "react-bootstrap"
import EditForm from "./forms/EditForm";

const BuilderModule = ({module: m, togglePin, onHide, onRemove, showBtn=true}) => {

  const [module, setModule] = useState(m);
  const [showModal, setShowModal] = useState(false)

  const Module = () => {
    const props = {
      id: module._id,
      body: module.body
    }
    switch(module.type) {
      case "card":  return <Card {...props} />
      case "image": return <Image {...props} />
      default:      return <h1>Get to default</h1>
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
        <EditForm
          module={module}
          setModule={setModule}
          setShowModal={setShowModal}
        />
      }
    </>
  )
}

export default BuilderModule