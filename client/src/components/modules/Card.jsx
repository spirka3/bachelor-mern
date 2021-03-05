import React, {useState} from 'react'
import {Button, Card as C} from 'react-bootstrap'
import ContentEditable from "react-contenteditable";

// https://codesandbox.io/s/l91xvkox9l?file=/src/index.js:1139-1161
const Card = ({id, body}) => {

  const {img, style} = body
  const [showToolBar, setShowToolBar] = useState(false)
  const [title, setTitle] = useState(body.title);
  const [text, setText] = useState(body.text);

  function EditButton(props) {
    return (
      <Button
        variant="link"
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }}
      >
        {props.name || props.cmd}
      </Button>
    );
  }

  const ToolBar = () => {
    return (
      <>
        <EditButton cmd="italic" />
        <EditButton cmd="bold" />
        <EditButton cmd="formatBlock" arg="h1" name="h1" />
        <EditButton
          cmd="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="link"
        />
      </>
    )
  }

  const handleChange = (e) => {

    setTitle(e.target.value)
  }

  const sanitize = () => {
    setShowToolBar(false)
  };

  return (
    <C style={style} key={id} className="grid-module">
      <C.Body>
        {/*<C.Title>{title}</C.Title>*/}
        <C.Title>
          {showToolBar && <ToolBar/>}
          <ContentEditable
            html={title} // innerHTML of the editable div
            disabled={false} // use true to disable edition
            onChange={handleChange} // handle innerHTML change
            onClick={()=>setShowToolBar(true)}
            onBlur={sanitize}
          />
        </C.Title>
        <C.Text>
          {text}
        </C.Text>
        <C.Img src={img} className="module-img"/>
      </C.Body>
    </C>
  )
}

export default Card