import React, {useEffect, useState} from 'react'
import {Navbar, Nav, NavLink, NavDropdown, Modal} from 'react-bootstrap'
import {UserIcon} from './others/UserIcon'
import {SearchBar} from './SearchBar'
import Image from "react-bootstrap/Image";
import {useLocation} from "react-router";
// import Sidebar from 'react-bootstrap-sidebar';
import uuid from "react-uuid";
import SmallButton from "./buttons/SmallButton";
import NavModal from "./modals/NavModal";
import {nav_routes} from "../helpers/data";

const Navigation = ({pages: p}) => {

  const [pages, setPages] = useState(p)
  const [children, setChildren] = useState([]);
  const [visible, setVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(false);
  const closeModal = () => setShowModal(false);

  const hasChildren = (page) => {
    return page.children.length
  }

  useEffect(() => {
    const ch = p.map(page => {
      if (hasChildren(page))
        return page.children
    })
    // console.log(ch.flat())
    setChildren(p.flat(page => {
      return page.children
    }))
  }, []);


  const edit = () => {
    setShowModal(true)
    console.log('edit')
  }

  const isChild = ({title}) => {
    return pages.filter(page => page.children.some(child => child.title === title)).length
  }

  const CustomNavs = () => {
    const shown = pages.filter(p => !p.hidden)
    return shown.map(page => (
      <div key={uuid()}>
        {page.children.length
          ? <DropDown page={page}/>
          : !isChild(page) && <NavLink href={page.path}>{page.title}</NavLink>
        }
      </div>
    ))
  }

  const DropDown = ({page}) => {
    return (
      <NavDropdown title={page.title} id={page._id}>
        {page.children.map(child => {
          return <NavDropdown.Item href={child.path}>{child.title}</NavDropdown.Item>
        })}
      </NavDropdown>
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
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <NavBrand/>
        <SearchBar/>
        <Navbar.Toggle/>
        <Navbar.Collapse>
        {/*<Button onClick={ () => setVisible(true) }>Open</Button>*/}
        {/*<Sidebar side='left' isVisible={visible} onHide={ () => setVisible(false) }>*/}
          <Nav className="ml-auto" navbar activeKey={useLocation().pathname}>
            <SmallButton onClick={edit} className="m-2">EditNav</SmallButton>
            {/* TEST */}
            <NavLink href='/test'/>
            <NavLink href='/tree'/>
            {/* ---- */}
            <CustomNavs/>
            <UserIcon/>
          </Nav>
        {/*</Sidebar>*/}
        </Navbar.Collapse>
      </Navbar>
      {showModal &&
        <NavModal
          pages={pages}
          setPages={setPages}
          closeModal={closeModal}/>
      }
    </>
  )
};

export default Navigation
