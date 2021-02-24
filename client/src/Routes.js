import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import './App.css'
import CustomPage from './components/pages/CustomPage.jsx'

import LoginPage from "./components/pages/LoginPage.jsx"
import LogoutPage from "./components/pages/LogoutPage.jsx"
import AdminPage from "./components/pages/AdminPage";
import ProfileForm from "./components/pages/ProfilePage";

import {getUser} from "./helpers/functions";
import ExampleLayout from "./components/ExampleLayout";
import RegisterPage from "./components/pages/RegisterPage";
import Page404 from "./components/pages/Page404";
import uuid from "react-uuid";
import TestPage from "./components/pages/TestPage";

function Routes({pages}) {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (getUser() !== null
        ? <Component {...props} />
        : <Redirect to="/login" />
      )}
    />
  )

  const createRoute = ({path, _id}) => {
    return (
      <Route exact path={path} key={uuid()}>
        <CustomPage id={_id}/>
      </Route>
    )
  } 

  return (
    <Switch>
      {/* Home route */}
      <Route path='/' exact component={ExampleLayout} />
      {/* Basic routes */}
      <Route exact path='/test' component={TestPage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='/login' component={LoginPage} />
      {/* Private routes */}
      <PrivateRoute exact path='/logout' component={LogoutPage} />
      <PrivateRoute exact path='/profile-settings' component={ProfileForm} />
      <PrivateRoute exact path='/admin' component={AdminPage} />
      {/* Custom routes */}
      {pages.map(createRoute)}
      {/* Not matched paths */}
      <Route path="*" component={Page404}/>
    </Switch>
  )
}

export default Routes
