import React from 'react'
import {Image as I} from 'react-bootstrap'

const Image = ({id, body}) => {

  const {src, title, alt} = body

  return (
    <I
      id={id}
      key={id}
      src={src}
      title={title}
      alt={alt}
      className="grid-module"
    />
  )
}

export default Image