import React, { useState } from "react";
import { Navbar, Nav, NavLink, NavDropdown } from "react-bootstrap";
import { UserIcon } from "./others/UserIcon";
import { SearchBar } from "./SearchBar";
import Image from "react-bootstrap/Image";
import { useLocation } from "react-router";
import uuid from "react-uuid";
import SmallButton from "./buttons/SmallButton";
import NavModal from "./modals/NavModal";
import { delEdit, getEdit, setEdit } from "../helpers/functions";
import NewPageModal from "./modals/NewPageModal";
import { navs } from "../helpers/data";

/** eheaeads */
const Navigation = ({ pages: _pages }) => {
  const [pages, setPages] = useState(navs);

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const openNav = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const closeModal2 = () => setShowModal2(false);

  const editNav = () => {
    openNav();
  };

  const newPage = () => {
    setShowModal2(true);
  };

  const toggleEditor = () => {
    getEdit() ? delEdit() : setEdit();
    setEditMode(!editMode);
  };

  const CustomNavs = () => {
    return navs
      .filter((p) => p.type !== "none")
      .map((p) => (
        <div key={uuid()}>
          {p.type === "drop" ? (
            <DropDown page={p} />
          ) : (
            <NavLink href={p.path}>{p.title}</NavLink>
          )}
        </div>
      ));
  };

  const DropDown = ({ page }) => (
    <NavDropdown title={page.title} id={page.title}>
      {page.children.map((child) => {
        return (
          <NavDropdown.Item href={child.path} key={child.path}>
            {child.title}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );

  const NavBrand = () => (
    <Navbar.Brand href="/">
      <Image alt="logo" src="/logo.png" width="40" height="40" />
    </Navbar.Brand>
  );

  const EditControls = () => (
    <>
      <SmallButton onClick={toggleEditor} className="m-2">
        Finish
      </SmallButton>
      <SmallButton onClick={newPage} className="m-2">
        New page
      </SmallButton>
      {/*<SmallButton onClick={editNav} className="m-2">Edit nav</SmallButton>*/}
      {/*<SmallButton onClick={undo} className="m-2">Undo</SmallButton>*/}
      {/*<SmallButton onClick={redo} className="m-2">Redo</SmallButton>*/}
    </>
  );

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <NavBrand />
        <SearchBar />
        <Navbar.Toggle />
        <Navbar.Collapse>
          {editMode ? (
            <EditControls />
          ) : (
            <SmallButton onClick={toggleEditor}>Edit</SmallButton>
          )}
          <Nav className="ml-auto" navbar activeKey={useLocation().pathname}>
            <NavLink href="/test">Tst</NavLink>
            <NavLink href="/tree">Tree</NavLink>
            <CustomNavs />
            <UserIcon />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {showModal && (
        <NavModal
          pages={pages.filter((p) => p.type !== "none")}
          setPages={setPages}
          closeModal={closeModal}
        />
      )}
      {showModal2 && <NewPageModal closeModal={closeModal2} />}
    </>
  );
};

export default Navigation;
