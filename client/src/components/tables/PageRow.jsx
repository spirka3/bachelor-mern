import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import uuid from "react-uuid";
import ReactTooltip from "react-tooltip";
import SmallButton from "../buttons/SmallButton";
import axios from "axios";
import NavDropdownModal from "../modals/NavDropdownModal";

const PageRow = ({ page, pages, columns }) => {
  const [navbar, setNavbar] = useState(page.navbar);
  const [published, setPublished] = useState(page.published);
  const [showModal, setShowModal] = useState(false);

  const NavToolTip = () => {
    return (
      <ReactTooltip id="drop" place="right" effect="solid" clickable>
        <div className="text-center">
          <p>
            <strong>{navbar?.title}</strong>
          </p>
          {navbar.children?.map((p) => (
            <p>{p.title} &times;</p>
          ))}
          <SmallButton variant="light">edit</SmallButton>
        </div>
      </ReactTooltip>
    );
  };

  const NavButtons = () => {
    const type = navbar.type;
    console.log(type);

    const active = (id) => id === type;

    const handleChange = (e) => {
      setNavbar({
        ...navbar,
        type: e.target.id,
      });
    };

    return (
      <ButtonGroup size="sm" onClick={handleChange}>
        <Button id="none" active={active("none")}>
          off
        </Button>
        <Button id="flat" active={active("flat")}>
          on
        </Button>
        <Button
          id="drop"
          active={active("drop")}
          data-tip
          data-for="drop"
          data-tip-disable={!active("drop")}
          onClick={() => setShowModal(true)}
        >
          drop
        </Button>
        {active("drop") && <NavToolTip />}
      </ButtonGroup>
    );
  };

  const Toggle = () => {
    const toggle = published;

    const handleChange = () => {
      axios
        .patch(`pages/${page._id}`, { published: !toggle })
        .then((response) => {
          setPublished(!toggle);
          console.log("success", response);
        })
        .catch((err) => {
          console.log("error", err.response);
        });
    };

    return (
      <Form.Switch
        id={uuid()}
        checked={toggle}
        label={`${toggle}`}
        onChange={handleChange}
      />
    );
  };

  // const notUnique = (innerHTML) => {
  //   let update = []
  //   for (const page in Object.keys(pages)) {
  //     if (page.title === innerHTML) {
  //       update = undefined
  //       break
  //     }
  //     if (page._id) {
  //       // save index
  //     }
  //   }
  //   if (update) {
  //     // setPages(update)
  //   } else {
  //     // console.log('NOT UNIQUE')
  //   }
  //   return pages.find(p => p.path === innerHTML)
  // }

  const editable = ["title", "path", "description"];
  const isEditable = (field) => editable.includes(field);

  const handleChange = ({ currentTarget: { textContent } }) => {
    // if (notUnique(textContent)) {
    //   console.log('NOT UNIQUE')
    // }
    // console.log(textContent)
  };

  const Cell = ({ field }) => {
    let body = page[field];
    // const editable = isEditable(field)
    const editable = false;

    if (field === "navbar.type") body = <NavButtons />;
    if (field === "published") body = <Toggle />;
    if (field === "created_by") body = <span>Full name</span>;
    if (field === "commits") body = <span>commits</span>; // TODO as Github
    if (field === "content") body = <span>json</span>; // TODO openModal

    return (
      <td key={field} contentEditable={editable} onBlur={handleChange}>
        {body}
      </td>
    );
  };

  return (
    <>
      <tr key={page.title} data-tip data-for={page.title}>
        {columns.map((col) => (
          <Cell field={col.field} />
        ))}
      </tr>
      {showModal && (
        <NavDropdownModal
          pages={pages}
          navbar={navbar}
          setNavbar={setNavbar}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <ReactTooltip
        id={page.title}
        place="left"
        effect="solid"
        border={false}
        type="light"
        delayHide={250}
        delayShow={250}
        delayUpdate={250}
      >
        {/* TODO onClick={deletePage} */}
        <SmallButton>&times;</SmallButton>
      </ReactTooltip>
    </>
  );
};

export default PageRow;
