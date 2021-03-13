import React from "react";
import {Card as C, Container, Row} from "react-bootstrap";
import './card.css'
import MUICard from "../components/modules/MUICard";
import MUICardSide from "../components/modules/MUICardSide";

const TreePage = () => {

  const {title, text, img} = {
    title: 'Title',
    text: 'Here’s the source code for creating source code for creating these styles. Note that column overrides are scoped to only the first children columns',
    img: '//placehold.it/200'
  }

  const ImageLeft = () => {
    return (
      <C style={{minWidth: '375px'}}>
        <Row className="no-gutters">
          <div className="col-auto">
            <img src={img} className="img-fluid" alt=""/>
          </div>
          <div className="col">
            <C.Body className="px-2">
              <C.Title>{title}</C.Title>
              <C.Text>{text}</C.Text>
            </C.Body>
          </div>
        </Row>
      </C>
    )
  }

  const ImageRight = () => {
    return (
      <C style={{minWidth: '375px'}}>
        <Row className="no-gutters">
          <div className="col">
            <C.Body className="px-2">
              <C.Title>{title}</C.Title>
              <C.Text className="overflow-dots">{text}</C.Text>
            </C.Body>
          </div>
          <div className="col-auto">
            <img src={img} className="img-fluid" alt=""/>
          </div>
        </Row>
      </C>
    )
  }

  const ImageTop = () => {
    return (
      <C>
        <C.Img variant="top" src={img}/>
        <C.Body>
          <C.Title>{title}</C.Title>
          <C.Text>{text}</C.Text>
        </C.Body>
      </C>
    )
  }

  const ImageBackground = () => {

    const imageStyle = {
      backgroundColor: 'rgba(119,119,119,0.5)',
      padding: '.75rem',
      width: '100%'
    }

    return (
      <C className="bg-dark text-white">
        <C.Img src={img} alt="Card image" />
        <C.ImgOverlay className="text-bottom d-flex">
          <C.Title style={imageStyle} className="align-self-end">{title}</C.Title>
        </C.ImgOverlay>
      </C>
    )
  }

  return (
    <>
      <ImageBackground />
      <br/>
      <ImageLeft />
      <br/>
      <ImageRight />
      <br/>
      <ImageTop />
      <br/>
    </>
  );
}

export default TreePage