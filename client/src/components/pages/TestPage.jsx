import React, {useEffect, useState} from "react"
import { Responsive, WidthProvider } from "react-grid-layout";
import { ButtonGroup } from "react-bootstrap";
import axios from "axios";
import {FetchError, FetchLoading} from "../others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";
import BuilderModule from "../modules/BuilderModule";
import SmallButton from "../buttons/SmallButton";
import NewModal from "../modules/modals/NewModal";
import {ToolBox} from "../others/Toolbox";
import {GridBoxItem} from "../others/Gridbox";

const GridLayout = WidthProvider(Responsive);

const TestPage = ({id='6033bbe31cbae847806d310d'}) => {

  const [data, isLoaded, error] = useDataApi('/modules/page/'+id)

  const [moduleType, setModuleType] = useState()
  const [modules, setModules] = useState([]);
  const [layouts, setLayouts] = useState({ lg: [] }) // lg: the field is important to make GridLayout works

  useEffect(() => {
    if (data) {
      setModules(data)
      setLayouts({ lg: data.map(m => {
        return {
          ...m.position,
          i: m._id // i: the field is important to make GridLayout works
        }
        }) })
    }
  }, [data])

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !data) {
    return <FetchLoading/>
  }

  const compactType = 'vertical'
  const animated = true

  const onLayoutChange = (layout) => {
    console.log('changed', layout)
    setLayouts({lg: layout})
  }
  const getModule = id => modules.find(m => m._id === id)

  const savePositions = () => {
    layouts.lg.map(layout => {
      axios.patch('/modules/'+layout.i, {
        ...getModule(layout.i),
        position: layout
      })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  const generateGrid = () => {
    const showing = layouts.lg.filter(layout => !layout.hide)
    return showing.map(layout => (
      <div key={layout.i}>
        <GridBoxItem
          module={getModule(layout.i)}
          layouts={layouts}
          setLayouts={setLayouts}
        />
      </div>
    ))
    // return <GridBox layouts={layouts} setLayouts={setLayouts}/>
  }

  return (
    <>
      <ToolBox
        items={layouts.lg || []}
        layouts={layouts}
        setLayouts={setLayouts}
      />
      <GridLayout
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        compactType={compactType}
        preventCollision={!compactType}
        measureBeforeMount={!animated}
        useCSSTransforms={animated}
      >
        {generateGrid()}
      </GridLayout>

      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">+card</SmallButton>
        <SmallButton variant="dark" name="image">+module</SmallButton>
      </ButtonGroup>
      <SmallButton onClick={savePositions} variant="dark">Save</SmallButton>
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

