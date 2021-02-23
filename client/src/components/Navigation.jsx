import React, {useState} from 'react'
import {Navbar, Nav, NavLink, NavDropdown} from 'react-bootstrap'
import {UserIcon} from './others/UserIcon'
import {SearchBar} from './SearchBar'
import Image from "react-bootstrap/Image";
import {useLocation} from "react-router";
// import Sidebar from 'react-bootstrap-sidebar';
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";
import useDataApi from "../helpers/useDataApi";
import {FetchError, FetchLoading} from "./others/FetchComponents";

const Navigation = () => {

  const location = useLocation()
  const [visible, setVisible] = useState(false);

  const [pages, isLoaded, error] = useDataApi('/pages');

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !pages) {
    return <FetchLoading/>
  }

  const createLink = (n) => {
    return (
      <div key={uuid()}>
        {Object.keys(n).includes("drop")
          ? <DropDown nav={n}/>
          : <NavLink href={n.path}>{n.title}</NavLink>}
      </div>
    )
  }

  const DropDown = ({nav}) => {
    return (
      <NavDropdown title={nav.title} id="basic-nav-dropdown">
        {nav.drop.map(createDropDownLink)}
      </NavDropdown>
    )
  }

  const createDropDownLink = ({path, title}) => {
    return (
      <NavDropdown.Item href={path}>{title}</NavDropdown.Item>
    )
  }

  const NavBrand = () => {
    return (
      <Navbar.Brand href="/">
        <Image alt="logo" src="/logo.png" width="40" height="40"/>
      </Navbar.Brand>
    )
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <NavBrand/>
      <SearchBar/>
      <Navbar.Toggle/>
      <Navbar.Collapse>
      {/*<Button onClick={ () => setVisible(true) }>Open</Button>*/}
      {/*<Sidebar side='left' isVisible={visible} onHide={ () => setVisible(false) }>*/}
        <Nav className="ml-auto" navbar activeKey={location.pathname}>
          <NavLink href='/test'>Test</NavLink>
          {pages.map(createLink)}
          <UserIcon/>
        </Nav>
      {/*</Sidebar>*/}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
