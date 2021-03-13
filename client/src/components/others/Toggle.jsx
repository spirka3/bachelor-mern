import React, {useState} from "react";
import {FormCheck} from "react-bootstrap";
import {pages} from "../../helpers/data";

const Toggle = ({id}) => {

  function handleChange() {
    const page = pages.find(p => p.id === id)
    page.visible = !page.visible
  }

  return (
    <FormCheck type="switch">
      <FormCheck.Input isInvalid checked={swt}/>
      <FormCheck.Label
        onClick={handleChange}
        style={{color: swt ? "green" : "red"}}
      >
        {`visible ${swt}`}
      </FormCheck.Label>
    </FormCheck>
  )
}

export default Toggle