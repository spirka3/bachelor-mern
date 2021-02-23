import React from "react";

const ToolBoxItem = (props) => {
  return (
    <div
      className="toolbox__items__item"
      onClick={props.onTakeItem.bind(undefined, props.item)}
    >
      {props.item.i}
    </div>
  );
}

export const ToolBox = (props) => {
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__items">
        {props.items.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            onTakeItem={props.onTakeItem}
          />
        ))}
      </div>
    </div>
  );
}