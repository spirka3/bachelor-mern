import React from "react";

const ToolBoxItem = ({item, layouts, setLayouts}) => {

  const onTakeItem = item => {
    console.log('show')
    console.log('prev', layouts)
    const update = []
    layouts.lg.forEach(l => {
      if (l.i === item.i) {
        l.hide = false
      }
      update.push(l)
    })
    console.log('current', update)
    setLayouts({lg: update})
  }

  if (!item.hide){
    // console.log('not hidden')
    return null
  }
  return (
    <div
      className="toolbox__items__item"
      onClick={()=>onTakeItem(item)}
    >
      {item.i}
    </div>
  )
}

export const ToolBox = ({items, layouts, setLayouts}) => {
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__items">
        {items.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            layouts={layouts}
            setLayouts={setLayouts}
          />
        ))}
      </div>
    </div>
  )
}