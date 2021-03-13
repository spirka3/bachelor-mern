import React from 'react'
import {Form, Button, Row, Container} from 'react-bootstrap';
import SmallButton from "./buttons/SmallButton";

export const SearchBar = () => {

  const customStyle = {
    // TODO display as one line
  };

  return (
    <Form inline className={"pr-1 "} style={{customStyle}}>
      <Form.Control
        type="text"
        placeholder="Search"
        size="sm"
        style={{
          borderTopRightRadius: '0', borderBottomRightRadius: '0',
          float: 'left', display: 'inline', width: '60%'
        }}
      />
      <SmallButton
        variant="outline-light"
        style={{
          borderTopLeftRadius: '0', borderBottomLeftRadius: '0',
          float: 'left', display: 'inline', width: '40%'
        }}
      >
        Search
      </SmallButton>
    </Form>
  )
}
