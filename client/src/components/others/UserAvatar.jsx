import React from 'react'
import Image from 'react-bootstrap/Image'

const UserAvatar = ({userImage, handleClick}) => {
  return (
    <Image src={userImage} rounded onClick={handleClick} style={{width:"60px", height:"60px", margin: "6px"}}/>
  )
}

export default UserAvatar