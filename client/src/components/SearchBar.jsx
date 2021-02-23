import React from 'react'
import {Form, Button, Row, Container} from 'react-bootstrap';

export const SearchBar = () => {

  const customStyle = {
    // TODO display as one line
  };

  return (
    <Form inline className={"pr-1 "} style={{customStyle}}>
      <Form.Control type="text" placeholder="Search" size="sm" className="mr-1"/>
      <Button variant="outline-light" size="sm">Search</Button>
    </Form>
  )
}
