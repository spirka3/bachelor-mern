import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import './App.css'
import {getAuth} from "./helpers/functions";

import CustomPage from './components/pages/CustomPage.jsx'
import LogoutPage from "./components/pages/LogoutPage.jsx"
import AdminPage from "./components/pages/AdminPage";
import Page404 from "./components/pages/Page404";
import uuid from "react-uuid";
import TestPage from "./components/pages/TestPage";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import TreePage from "./components/pages/TreePage";

function Routes({pages}) {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    // TODO save path to history and after login, jump in
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (
      getAuth()
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

  const LoginPage = () => {
    return <AuthPage action='login'/>
  }

  const RegisterPage = () => {
    return <AuthPage action='register'/>
  }

  const PagesTree = () => {
    return <TreePage pages={pages}/>
  }

  return (
    <Switch>
      {/* User's routes */}
      <Route exact path='/login' render={LoginPage} />
      <Route exact path='/register' render={RegisterPage} />
      <PrivateRoute exact path='/logout' component={LogoutPage} />
      <PrivateRoute exact path='/profile' component={ProfilePage} />
      <PrivateRoute exact path='/admin' component={AdminPage} />
      {/* TEST */}
      <Route exact path='/test' component={TestPage} />
      <Route exact path='/tree' component={PagesTree} />
      {/* ---- */}
      {/* Custom routes */}
      {pages.map(createRoute)}
      {/* Not matched paths */}
      <Route path="*" component={Page404}/>
    </Switch>
  )
}

export default Routes
