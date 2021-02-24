import React from "react";

const GridBoxItem = ({item, onTakeItem}) => {
  if (!item.hide){
    console.log('not hidden')
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

export const GridBox = ({items, onTakeItem}) => {
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__items">
        {items.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            onTakeItem={onTakeItem}
          />
        ))}
      </div>
    </div>
  )
}