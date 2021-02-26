import React, {useEffect, useState} from "react"
import { Responsive, WidthProvider } from "react-grid-layout";
import {ButtonGroup, Container, Image} from "react-bootstrap";
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

  const [moduleType, setModuleType] = useState('')
  const [modules, setModules] = useState([]);
  const [layouts, setLayouts] = useState({lg: []})
  const [toolbox, setToolbox] = useState({lg: []})

  useEffect(() => {
    if (data) {
      setModules(data)
      const hidden = []
      const shown = []
      data.forEach(m => {
        const withId = {...m.position, i: m._id} // i is required from GridLayout
        m.position.hide ? hidden.push(withId) : shown.push(withId)
      })
      setLayouts({lg: shown}) // lg is required from GridLayout
      setToolbox({lg: hidden})
    }
  }, [data])

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !data) {
    return <FetchLoading/>
  }

  const [compactType, animated] = ['vertical', true]

  const onLayoutChange = (layout) => {
    console.log('changed layout to', layout)
    setLayouts({lg: layout})
  }

  const getModule = id => modules.find(m => m._id === id)

  const save = () => {
    savePositions()
    hideModules()
  }

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

  const hideModules = () => {
    toolbox.lg.map(layout => {
      axios.patch('/modules/'+layout.i, {
        ...getModule(layout.i),
        position: {
          ...layout,
          hide: true
        }
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
    return layouts.lg.map(layout => (
      <div key={layout.i} className="grid-box">
        <GridBoxItem
          module={getModule(layout.i)}
          setLayouts={setLayouts}
          setToolbox={setToolbox}
        />
      </div>
    ))
  }

  return (
    <>
      <ToolBox
        toolbox={toolbox.lg}
        setToolbox={setToolbox}
        setLayouts={setLayouts}
      />
      <GridLayout
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        compactType={compactType}
        preventCollision={!compactType}
        measureBeforeMount={!animated}
        useCSSTransforms={animated}
        class="contain"
      >
        {generateGrid()}
      </GridLayout>

      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">+card</SmallButton>
        <SmallButton variant="dark" name="image">+image</SmallButton>
      </ButtonGroup>
      <SmallButton onClick={save} variant="dark">save grid</SmallButton>
      {moduleType &&
        <NewModal
          pageId={id}
          moduleType={moduleType}
          setModules={setModules}
          setShowModal={setModuleType}
          setLayouts={setLayouts}
        />
      }
      {/*<Container style={{width: '200px', height: '400px'}}>*/}
      {/*  <Image src="https://picsum.photos/200/300" className="module-img"/>*/}
      {/*</Container>*/}
    </>
  );
};

export default TestPage

