import React, {useState} from "react";
import BuilderModule from "../modules/BuilderModule";
import axios from "axios";

export const GridBoxItem = ({module, setLayouts, setToolbox}) => {

  let item = module.position

  const onHide = () => {
    console.log('hide')
    setToolbox(prevState => {
      return {
        ...prevState,
        lg: [...(prevState.lg || []), item]
      }
    })
    setLayouts(prevState => {
      return {
        ...prevState,
        hide: true,
        lg: prevState.lg.filter(({ i }) => i !== item.i)
      }
    })
  }
  const togglePin = () => {
    console.log('toggle')
    setLayouts(prev => {
      const filtered = prev.lg.filter(({ i }) => i !== item.i)
      const found = prev.lg.find(({ i }) => i === item.i)

      found.static = !found.static
      console.log('changed to', found.static)
      return {...prev, lg: [...filtered, found]}
    })
  }
  const onRemove = () => {
    console.log('remove')
    axios.delete('/modules/'+module._id)
      .then(response => {
        setLayouts(prev => {
          return {
            lg: prev.lg.filter(({ i }) => i !== module._id)
          }
        })
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <BuilderModule
      module={module}
      togglePin={togglePin}
      onHide={onHide}
      onRemove={onRemove}
    />
  )
}

export const createGridBox = (modules, layouts, setLayouts, setToolbox) => {

  const getModule = id => modules.find(m => m._id === id)

  return layouts.map(layout => (
    <div key={layout.i} className="grid-box">
      <GridBoxItem
        module={getModule(layout.i)}
        setLayouts={setLayouts}
        setToolbox={setToolbox}
      />
    </div>
  ))
}