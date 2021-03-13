import React from 'react'
import {Card as C, Col, ResponsiveEmbed, Row} from 'react-bootstrap'
import '../../pages/card.css'
import {Redirect} from "react-router";

const Card = ({id, body}) => {

  const {img, title, text, style} = body
  // className="w-100 h-100 module-grid"

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
      <C className="grid-module">
        <Row className="no-gutters">
          <Col>
            <C.Body className="px-2">
              <C.Title>{title}</C.Title>
              <C.Text className="overflow-dots">{text}</C.Text>
            </C.Body>
          </Col>
          <Col className="col-auto grid-module">
            <C.Img src={img} alt=""/>
          </Col>
        </Row>
      </C>
    )
  }

  const ImageTop = () => {
    return (
      <C key={id} className="grid-module">
        <C.Body className="p-0">
          <div className="p-1">
            <C.Title>{title}</C.Title>
            <C.Text>{text}</C.Text>
          </div>
          <C.Img src={img} className="module-img"/>
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
      <C key={id} className="text-white grid-module">
        <C.Img src={img} alt="image" className="grid-module"/>
        <C.ImgOverlay className="text-bottom d-flex p-0">
          <C.Title style={imageStyle} className="align-self-end">{title}</C.Title>
        </C.ImgOverlay>
      </C>
    )
  }

  const VideoBackground = () => {

    return (
      <ResponsiveEmbed aspectRatio="16by9" className="grid-module">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/E7wJTI-1dvQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen/>
      </ResponsiveEmbed>
    )
  }

  const CardImage = () => {
    switch (style) {
      case 'l':
        return <ImageLeft />
      case 'r':
        return <ImageRight />
      case 'b':
        return <ImageBackground />
      case 'v':
        return <VideoBackground />
      default:
        return <ImageTop />
    }
  }

  return <CardImage />
};

export default Card