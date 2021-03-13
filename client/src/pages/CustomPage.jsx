import React, { useEffect, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import NewModal from "../components/modules/modals/NewModal";
import BuilderModule from "../components/modules/BuilderModule";
import SmallButton from "../components/buttons/SmallButton";
import axios from "axios";

const CustomPage = ({ page }) => {
  const [modules, setModules] = useState([]);
  const [moduleType, setModuleType] = useState(false);

  useEffect(() => {
    document.title = page.title;
    axios
      .get(`/modules/page/${page._id}`)
      .then((response) => {
        setModules(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Toolbar = () => {
    const handleClick = () => {
      axios
        .patch(`/pages/${page._id}`, {
          published: !page.published,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <SmallButton className="corner-toolbar" onClick={handleClick}>
        {"" + page.published}
      </SmallButton>
    );
  };

  const Toolbar2 = () => (
    <>
      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">
          Create card module
        </SmallButton>
        <SmallButton variant="dark" name="image">
          Create image module
        </SmallButton>
      </ButtonGroup>
      {moduleType && (
        <NewModal
          pageId={page._id}
          moduleType={moduleType}
          setShowModal={setModuleType}
        />
      )}
    </>
  );

  const Modules = () => modules.map((m) => <BuilderModule module={m} />);

  return (
    <>
      <Toolbar />
      <Modules />
      <Toolbar2 />
    </>
  );
};

export default CustomPage;
