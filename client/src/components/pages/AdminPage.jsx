import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import {pages} from "../../helpers/data";
import Toggle from "../others/Toggle";
import {Button} from "react-bootstrap";

const AdminPage = () => {

  // TODO
  // const handleAccept = () => {
  // }
  //
  // const columns = [{
  //   dataField: 'name',
  //   text: 'CustomPage name'
  // }, {
  //   dataField: 'visible',
  //   text: 'Visible',
  //   formatter: Toggle,
  //   headerStyle: () => { return {width: '1%'}; }
  // }]

  const renderPageLine = (page) => {
    return (
      <div>
        <a href={page.path}>
          <h3>{page.name}</h3>
        </a>

        Created by
        <a href="#">
          <span> unknown</span>
        </a>

        <Toggle id={page.id}/>
        <Button>Edit</Button>
        <Button variant="danger">Delete</Button>

        <br/>
        <br/>
      </div>
    )
  }

  return (
    <>
      <h1>Custom Pages</h1>
      <h2>Page name:</h2>
      {pages.map(renderPageLine)}
    </>
    // <BootstrapTable
    //   keyField="id"
    //   hover
    //   data={pages}
    //   columns={columns}
    // />
  )
}

export default AdminPage