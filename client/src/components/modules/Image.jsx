import React from 'react'
import {Image as BsImage} from 'react-bootstrap'

const Image = ({id, body}) => {

  const {src, title, alt} = body

  return (
    <BsImage
      id={id}
      key={id}
      src={src}
      title={title}
      alt={alt}
      className="module-img"
    />
  )
}

export default Image