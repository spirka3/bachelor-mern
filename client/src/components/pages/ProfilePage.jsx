import React, {useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import MyEditor from "../others/MyEditor";
import {getUser} from "../../helpers/functions";
import UserInfoForm from "../forms/UserInfoForm";
import UserPassForm from "../forms/UserPassForm";
import {Redirect} from "react-router";

const ProfilePage = () => {

  const [formType, setFormType] = useState('name');

  const user = getUser()

  const active = (id) => {
    return formType === id && 'active';
  }

  return (
    <>
      {getUser() !== null
        ? <Redirect to="/"/>
        : <>
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
      }
    </>
  )
}

export default ProfilePage;
