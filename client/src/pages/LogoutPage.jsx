import React from "react"
import {Redirect} from "react-router"
import {delAuth} from "../helpers/functions"

const LogoutPage = () => {

  delAuth() // delete auth token

  return <Redirect to="/"/>
}

export default LogoutPage
