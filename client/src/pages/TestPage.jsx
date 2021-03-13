import React, {useEffect, useState} from "react"
import { Responsive, WidthProvider } from "react-grid-layout";
import { ButtonGroup } from "react-bootstrap";
import axios from "axios";
import {FetchError, FetchLoading} from "../components/others/FetchComponents";
import useDataApi from "../helpers/useDataApi";
import SmallButton from "../components/buttons/SmallButton";
import NewModal from "../components/modules/modals/NewModal";
import {ToolBox} from "../components/others/Toolbox";
import {createGridBox} from "../components/others/Gridbox";

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

  if (error) return <FetchError e={error.message} />
  if (!isLoaded || !data) return <FetchLoading />

  const compactType = 'vertical'
  const animated = true

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

  const addCard = () => {
    const newModule = {
      page: id,
      name: "moduleXY",
      type: 'card',
      position: {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
        static: false
      },
      body: data,
      status: "active"
    }
    addToDb(newModule)
  }

  const addToDb = (newModule) => {
    axios.post('/modules', newModule)
      .then(response => {
        const addedModule = response.data
        const positionWithId = {
          ...addedModule.position,
          i: addedModule._id
        }
        setModules(prev => [...prev, {
          ...addedModule,
          position: positionWithId
        }])
        setLayouts(prev => {
          return {
            lg: [...prev.lg, positionWithId]
          }
        })
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <ToolBox
        toolbox={toolbox.lg}
        setToolbox={setToolbox}
        setLayouts={setLayouts}
      />
      <SmallButton onClick={addCard} variant="dark">+card</SmallButton>
      {/*<ButtonGroup onClick={(e) => setModuleType(e.target.name)}>*/}
      {/*  <SmallButton variant="dark" name="card">+card</SmallButton>*/}
      {/*  <SmallButton variant="dark" name="image">+image</SmallButton>*/}
      {/*</ButtonGroup>*/}
      <SmallButton onClick={save} variant="dark">save grid</SmallButton>
      <GridLayout
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        compactType={compactType}
        preventCollision={!compactType}
        measureBeforeMount={!animated}
        useCSSTransforms={animated}
      >
        {createGridBox(modules, layouts.lg, setLayouts, setToolbox)}
      </GridLayout>
      {moduleType &&
        <NewModal
          pageId={id}
          moduleType={moduleType}
          setModules={setModules}
          setShowModal={setModuleType}
          setLayouts={setLayouts}
        />
      }
    </>
  )
}

export default TestPage