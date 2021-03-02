import React, {useEffect, useState} from "react"
import axios from "axios";
import {ButtonGroup, Button, Container} from 'react-bootstrap'
import ImageEditor from "../others/ImageEditor"
import UserInfoForm from "../forms/UserInfoForm"
import UserPassForm from "../forms/UserPassForm"
import {tokenConfig} from "../../helpers/functions";

const ProfilePage = () => {

  const [form, setForm] = useState('profile')
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    axios.get('/auth/user', tokenConfig())
      .then(response => {
        setUser(response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, []);

  const changeForm = (e) => {
    setError(null)
    setForm(e.target.id)
  }

  const saveImage = (image) => {
    onSubmit('/users/avatar/', { avatar: image })
  }

  const saveProfile = (data) => {
    onSubmit('/users/', data)
  }

  const savePassword = (data) => {
    onSubmit('/users/password/', data)
  }

  const onSubmit = (url, data) => {
    console.log('submit', data)
    axios.patch(url+user._id, data)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        setError(err.response.data.message)
        console.log(err.response)
      })
  }

  const props = {
    defaultValues: user,
    onSubmit: form === 'profile'
      ? saveProfile
      : savePassword,
    error,
    style: {
      width: "250px"
    }
  }

  const active = id => form === id && 'active'

  return (
    <Container>
      <ImageEditor src={user?.avatar} saveImage={saveImage} />
      <ButtonGroup
        className="my-3"
        onClick={changeForm}
      >
        <Button id="profile" className={active("profile")}>Change name</Button>
        <Button id="passwd" className={active("passwd")}>Change pass</Button>
      </ButtonGroup>
      {form === 'profile'
        ? <UserInfoForm {...props} />
        : <UserPassForm {...props} />
      }
    </Container>
  )
}

export default ProfilePage;
