import React from "react"
import {Redirect} from "react-router"
import {delAuth} from "../../helpers/functions"

const LogoutPage = () => {

  delAuth()

  return <Redirect to="/"/>
}

export default LogoutPage
