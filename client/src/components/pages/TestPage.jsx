import React, {useState} from "react"
import {FetchError, FetchLoading} from "../others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import BuilderModule from "../modules/BuilderModule";
import {Button, ButtonGroup, Container, OverlayTrigger, Tooltip} from "react-bootstrap";
import SmallButton from "../buttons/SmallButton";
import NewModal from "../modules/modals/NewModal";

const GridLayout = WidthProvider(Responsive);

const TestPage = ({id='6033bbe31cbae847806d310d'}) => {

  const [modules, isLoaded, error] = useDataApi('/modules/page/'+id);
  const [moduleType, setModuleType] = useState(false);

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !modules) {
    return <FetchLoading/>
  }

  const compactType = 'vertical'
  const animated = true

  // i: the field is important to make GridLayout works
  const myLayout = modules.map(m => {
    // or duplicate _id in db as { ...module, position.i: _id }
    return {
      ...m.position,
      i: m._id
    }
  })
  // lg: is also important to GridLayout
  const layouts = { lg: myLayout }

  const getModule = (id) => modules.find(m => m._id === id)

  const createGridModules = () => {
    return _.map(layouts.lg, layout => {
      console.log('layout', layout)
      return (
        <div key={layout.i}>
           <BuilderModule module={getModule(layout.i)} />
        </div>
      );
    });
  }

  return (
    <>
      <GridLayout
        layouts={layouts}
        compactType={compactType}
        preventCollision={!compactType}
        measureBeforeMount={!animated}
        useCSSTransforms={animated}
      >
        {createGridModules()}
      </GridLayout>
      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">Create card module</SmallButton>
        <SmallButton variant="dark" name="image">Create image module</SmallButton>
      </ButtonGroup>
      {moduleType &&
        <NewModal
          pageId={id}
          moduleType={moduleType}
          setShowModal={setModuleType}
        />
      }
    </>
  );
}

export default TestPage

