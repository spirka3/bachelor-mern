import React from "react";
import BuilderModule from "../modules/BuilderModule";
import axios from "axios";

export const GridBoxItem = ({module, layouts, setLayouts}) => {
  console.log('gridModule', module)
  const id = module._id
  let pin = module.position.static

  const onHide = () => {
    console.log('hide')
    console.log('prev', layouts)
    const update = []
    layouts.lg.forEach(l => {
      if (l.i === id) {
        l.hide = true
      }
      update.push(l)
    })
    console.log('current', update)
    setLayouts({lg: update})
  }

  const togglePin = () => {
    console.log('toggle', pin)
    console.log('prev', layouts)
    const update = []
    pin = pin === null ? false : !pin
    layouts.lg.forEach(l => {
      if (l.i === id) {
        console.log('found', pin)
        l.static = pin
      }
      console.log(l)
      update.push(l)
    })
    console.log('curr', update)
    setLayouts({lg: update})
    // const updateStatic = pin === null ? false : !pin
    // axios.patch('/modules/'+id, {
    //   ...module,
    //   position: {
    //     ...module.position,
    //     static: updateStatic
    //   }
    // })
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  const onRemove = () => {
    console.log('remove')
    console.log('prev', layouts)
    const update = layouts.lg.filter(l => l.i !== id)
    console.log('curr', update)
    setLayouts({lg: update})
    // axios.delete('/modules/'+id)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
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

// export const GridBox = ({getModule, layouts, setLayouts}) => {
//   const showing = layouts.lg.filter(layout => !layout.hide)
//   console.log('showing')
//   return (
//     <div className="grid-box">
//       {showing.map(layout => (
//         <div key={layout.i}>
//           <GridBoxItem module={()=>getModule(layout.i)} layout={layout} setLayouts={setLayouts}/>
//         </div>
//       ))}
//     </div>
//   )
// }