import React from 'react'
import {Card as C} from 'react-bootstrap'

const Card = ({id, body}) => {

  const {img, title, text, style} = body
  // className="w-100 h-100 module-grid"
  return (
    <C style={style} key={id}>
      <C.Body>
        <C.Title>{title}</C.Title>
        <C.Text>{text}</C.Text>
        <C.Img src={img}/>
      </C.Body>
    </C>
  )
}

export default Card