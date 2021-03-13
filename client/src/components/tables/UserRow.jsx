import Image from "react-bootstrap/Image";
import {formattedDate} from "../../helpers/functions";
import React, {useState} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import uuid from "react-uuid";

const UserRow = ({user, columns}) => {

  const [admin, setAdmin] = useState(user.admin)

  const Toggle = () => {

    const toggle = admin

    const handleChange = () => {
      axios.patch(`users/${user._id}`, {admin: !toggle})
        .then(response => {
          setAdmin(!toggle)
          console.log('success', response)
        })
        .catch(err => {
          console.log('error', err.response)
        })
    }

    return (
      <Form.Switch
        id={uuid()}
        checked={toggle}
        label={`${toggle}`}
        onChange={handleChange}
      />
    )
  }

  const Cell = ({field}) => {
    let body = user[field]

    if (field === 'pages')
      body = <p>list</p>  // TODO
    if (field === 'admin')
      body = <Toggle />
    if (field === 'avatar')
      body = <Image alt="logo" src="/logo.png" width="30" height="30" /> // TODO
    if (field === 'register_date')
      body = <p>{formattedDate(body)}</p>

    return <td key={field}>{body}</td>
  }

  return (
    <tr key={user._id}>
      {columns.map(col => <Cell field={col.field}/> )}
    </tr>
  )
}

export default UserRow