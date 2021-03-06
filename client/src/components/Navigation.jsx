import React, {useEffect, useState} from 'react'
import {Navbar, Nav, NavLink, NavDropdown, Modal} from 'react-bootstrap'
import {UserIcon} from './others/UserIcon'
import {SearchBar} from './SearchBar'
import Image from "react-bootstrap/Image";
import {useLocation} from "react-router";
import uuid from "react-uuid";
import SmallButton from "./buttons/SmallButton";
import NavModal from "./modals/NavModal";
import {useEditor} from "@craftjs/core";

const Navigation = ({pages: p}) => {

  // const {
  //   enabled,
  //   actions: { setOptions },
  // } = useEditor((state) => ({
  //   enabled: state.options.enabled,
  // }));

  const [pages, setPages] = useState(p)
  const [hiddenPages, setHiddenPages] = useState(p.filter(page => !page.onNavBar))

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onlyChild = ({title}) => {
    return !pages.filter(page => page.children.some(child => child.title === title)).length
  }

  const CustomNavs = () => {
    return pages.map(page => (
      <div key={uuid()}>
        {page.onNavBar && onlyChild(page) && (
          page.children.length
          ? <DropDown page={page}/>
          : <NavLink href={page.path}>{page.title}</NavLink>
        )}
      </div>
    ))
  }

  const DropDown = ({page}) => {
    return (
      <NavDropdown title={page.title} id={page._id}>
        {page.children.map(child => {
          return <NavDropdown.Item href={child.path} key={child.path}>{child.title}</NavDropdown.Item>
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
            <SmallButton onClick={openModal} className="m-2">EditNav</SmallButton>

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
          pages={pages.filter(page => onlyChild(page) && page.onNavBar)} // pages onNavBar
          setPages={setPages}
          hiddenPages={hiddenPages}
          setHiddenPages={setHiddenPages}
          closeModal={closeModal}/>
      }
    </>
  )
};

export default Navigation

