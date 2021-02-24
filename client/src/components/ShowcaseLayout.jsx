import React, {useState} from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import {generateLayout} from "../helpers/functions";
import {ToolBox} from "./others/Toolbox";

const GridLayout = WidthProvider(Responsive);

const ShowcaseLayout = ({onLayoutChange}) => {

  const createGridModules = () => {
    console.log(layouts)
    return _.map(layouts.lg, l => {
      return (
        <div key={l.i} className={l.static ? "static" : ""}>
          <div className="hide-button" onClick={() => onPutItem(l)}>
            &times;
          </div>
          <span className="text">{l.i}</span>
        </div>
      );
    });
  }

  const onTakeItem = item => {
    setToolbox(prevState => {
      return {
        ...prevState,
        lg: prevState.lg.filter(({ i }) => i !== item.i)
      }
    })

    setLayouts(prevState => {
      return {
        ...prevState,
        lg: [...prevState.lg, item]
      }
    })
  };

  const onPutItem = item => {
    setToolbox(prevState => {
      return {
        ...prevState,
        lg: [...(prevState.lg || []), item]
      }
    })
    setLayouts(prevState => {
      return {
        ...prevState,
        lg: prevState.lg.filter(({ i }) => i !== item.i)
      }
    })
  };

  const [toolbox, setToolbox] = useState({ lg: [] })
  const [layouts, setLayouts] = useState({lg: generateLayout()})

  const compactType = 'vertical'
  const animated = true

  return (
    <div>
      <ToolBox
        items={toolbox.lg || []}
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
    </div>
  );
}

export default ShowcaseLayout