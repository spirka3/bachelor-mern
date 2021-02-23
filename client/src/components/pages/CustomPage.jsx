import React, {useEffect, useState} from "react"
import {Button, ButtonGroup} from "react-bootstrap";
import NewModal from "../modules/modals/NewModal";
import BuilderModule from "../modules/BuilderModule";
import axios from "axios";
import SmallButton from "../buttons/SmallButton";

const CustomPage = ({id}) => {

  const [modules, setModules] = useState([])
  const [moduleType, setModuleType] = useState(false);

  useEffect(() => {
    axios.get('/modules/page/'+id)
      .then(response => {
        setModules(response.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <>
      {modules.map(m => {
        return (
          <div>
            <h1>{m.title}</h1>
            <BuilderModule module={m}/>
          </div>
        )
      })}
      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">Create card module</SmallButton>
        <SmallButton variant="dark" name="image">Create image module</SmallButton>
      </ButtonGroup>
      {moduleType &&
        <NewModal
          pageId={id}
          moduleType={moduleType}
          setShowModal={setModuleType}
        />
      }
    </>
  )
}

export default CustomPage;