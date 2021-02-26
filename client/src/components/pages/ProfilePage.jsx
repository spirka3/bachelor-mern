import React, {useEffect, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import MyEditor from "../others/MyEditor";
import {getUser, reloadPage, setUser} from "../../helpers/functions";
import UserInfoForm from "../forms/UserInfoForm";
import UserPassForm from "../forms/UserPassForm";
import axios from "axios";

const ProfilePage = () => {

  const [formType, setFormType] = useState('name');

  const user = getUser() // TODO get token

  useEffect(() => {
    axios.post('/auth/user', user)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, []);


  const active = (id) => {
    return formType === id && 'active';
  }

  return (
    <>
      <MyEditor userImage={user.image}/>

      <ButtonGroup onClick={(e) => setFormType(e.target.id)} className="btn-header">
        <Button id="name" className={active("name")}>Change name</Button>
        <Button id="pass" className={active("pass")}>Change pass</Button>
      </ButtonGroup>

      {formType === 'name'
        ? <UserInfoForm data={user.name}/>
        : <UserPassForm/>
      }
    </>
  )
}

export default ProfilePage;
