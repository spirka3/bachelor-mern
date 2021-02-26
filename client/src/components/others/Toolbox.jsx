import React from "react";

const ToolBoxItem = ({item, setToolbox, setLayouts}) => {

  const onTakeItem = () => {
    setToolbox(prevState => {
      return {
        ...prevState,
        lg: prevState.lg.filter(({ i }) => i !== item.i)
      }
    })
    setLayouts(prevState => {
      return {
        ...prevState,
        hide: false,
        lg: [...prevState.lg, item]
      }
    })
  }

  return (
    <div className="toolbox__items__item" onClick={onTakeItem}>
      {item.i}
    </div>
  )
}

export const ToolBox = ({toolbox, setToolbox, setLayouts}) => {
  return (
    <div className="toolbox">
      <h6>Toolbox</h6>
      <div className="toolbox__items">
        {toolbox.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            setToolbox={setToolbox}
            setLayouts={setLayouts}
          />
        ))}
      </div>
    </div>
  )
}