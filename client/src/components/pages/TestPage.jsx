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

const GridLayout = WidthProvider(Responsive);

const TestPage = ({id='6033bbe31cbae847806d310d'}) => {

  const [modules, isLoaded, error] = useDataApi('/modules/page/'+id)

  const [moduleType, setModuleType] = useState()
  // lg: the field is important to make GridLayout works
  const [layouts, setLayouts] = useState({ lg: [] })

  useEffect(() => {
    if (modules) {
      // i: the field is important to make GridLayout works
      setLayouts({ lg: modules.map(m => m.position) })
    }
  }, [modules])

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !modules) {
    return <FetchLoading/>
  }

  const compactType = 'vertical'
  const animated = true

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

  const onTakeItem = item => {
    const update = { lg: []}
    console.log('prev', update)
    layouts.lg.forEach(l => {
      if (l.i === item.i) {
        update.lg.push({
          ...l,
          hide: false
        })
      } else {
        update.lg.push(l)
      }
    })
    console.log('current', update)
    setLayouts(update)
  }
  const onPutItem = item => {
    const update = { lg: []}
    console.log('prev', update)
    layouts.lg.forEach(l => {
      if (l.i === item.i) {
        update.lg.push({
          ...l,
          hide: true
        })
      } else {
        update.lg.push(l)
      }
    })
    console.log('current', update)
    setLayouts(update)
  }

  const onLayoutChange = (layout) => {
    setLayouts({lg: layout})
  }

  const BoxItem = ({layout}) => {
    return (
        <BuilderModule module={getModule(layout.i)} onPutItem={onPutItem}/>
    );
  }


  const createGridModules = () => {
    const showing = layouts.lg.filter(layout => !layout.hide)
    console.log('showing', showing)
    return showing.map(layout =>
      <div key={layout.i}>
       <BoxItem layout={layout}/>
      </div>
    )
  }

  return (
    <>
      <ToolBox
        items={layouts.lg || []}
        onTakeItem={onTakeItem}
      />
      <GridLayout
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        compactType={compactType}
        preventCollision={!compactType}
        measureBeforeMount={!animated}
        useCSSTransforms={animated}
      >
        {createGridModules()}
      </GridLayout>
      <ButtonGroup onClick={(e) => setModuleType(e.target.name)}>
        <SmallButton variant="dark" name="card">+card</SmallButton>
        <SmallButton variant="dark" name="image">+module</SmallButton>
      </ButtonGroup>
      <SmallButton onClick={savePositions} variant="dark" name="image">Save positions</SmallButton>
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

