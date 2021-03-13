import React, {useEffect, useState} from 'react'
import Table from "react-bootstrap/Table";
import useDataApi from "../../helpers/useDataApi";
import {FetchError, FetchLoading} from "../others/FetchComponents";
import UserRow from "./UserRow";

const UsersTable = () => {

  const [data, isLoaded, error] = useDataApi('/users')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) setUsers(data)
  }, [data])

  if (error) return <FetchError e={error.message} />
  if (!isLoaded || !data) return <FetchLoading />

  const columns = [
    {
      field: 'avatar',
      text: ''
    }, {
      field: 'name',
      text: 'Name'
    }, {
      field: 'email',
      text: 'Email'
    }, {
      field: 'admin',
      text: 'Admin'
    }, {
      field: 'register_date',
      text: 'Register',
    }, {
      field: 'pages',
      text: 'Pages'
    }
  ]

  const Header = () => (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col.text}</th>
        ))}
      </tr>
    </thead>
  )

  const Body = () => (
    <tbody>
      {users.map(user => <UserRow user={user} columns={columns}/> )}
    </tbody>
  )

  return (
    <Table responsive>
      <Header/>
      <Body />
    </Table>
  )
}

export default UsersTable