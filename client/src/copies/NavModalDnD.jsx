import React, {useEffect, useState, forwardRef} from "react";
import SortableTree, {toggleExpandedForAll} from "react-sortable-tree";
import {Button, ButtonGroup, Modal} from "react-bootstrap";
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { toClass } from 'recompose';

const wrapInTestContext = (WrappedComponent) => {
  const TestContextWrapper = toClass(props => (
    <Provider store={store}>
      <StaticRouter context={context}>
        <WrappedComponent {...props} />
      </StaticRouter>
    </Provider>
  ));

  return DragDropContext(TestBackend)(TestContextWrapper);
};

// -------------------------
// Create an drag source component that can be dragged into the tree
// https://react-dnd.github.io/react-dnd/docs-drag-source.html
// -------------------------
// This type must be assigned to the tree via the `dndType` prop as well
const externalNodeType = 'yourNodeType';
const externalNodeSpec = {
  // This needs to return an object with a property `node` in it.
  // Object rest spread is recommended to avoid side effects of
  // referencing the same object in different trees.
  beginDrag: componentProps => ({ node: { ...componentProps.node } }),
};
const externalNodeCollect = (connect /* , monitor */) => ({
  connectDragSource: connect.dragSource(),
  // Add props via react-dnd APIs to enable more visual
  // customization of your component
  // isDragging: monitor.isDragging(),
  // didDrop: monitor.didDrop(),
});
const externalNodeBaseComponent = ({ connectDragSource, node }) =>
  connectDragSource(
    <div
      style={{
        display: 'inline-block',
        padding: '3px 5px',
        background: 'blue',
        color: 'white',
      }}
    >
      {node.title}
    </div>,
    { dropEffect: 'copy' }
  );
const YourExternalNodeComponent = DragSource(
  externalNodeType,
  externalNodeSpec,
  externalNodeCollect
)(externalNodeBaseComponent);

const NavModal = ({pages, setPages, closeModal}) => {

  const [treeData, setTreeData] = useState([])
  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState();

  const isChild = ({title}) => {
    return pages.filter(page => page.children.some(child => child.title === title)).length
  }

  useEffect(() => {
    setTreeData(pages.filter(page => !isChild(page)))
  }, []);

  const onChange = (treeData) => {
    setTreeData(treeData)
    setPages(treeData)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const expand = () => {
    const expanded = !toggle
    setToggle(expanded)
    setTreeData(toggleExpandedForAll({treeData, expanded}))
  }

  const hide = (_id) => {
    setPages(prev => {
      const idx = prev.findIndex(p => p._id === _id);
      prev[idx].hide = true
      return prev
    })
    console.log('hide')
  }

  return (
    <React.Fragment>
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Custom pages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ height: 600, width: 800 }}>
          <div className="bar-wrapper">
            <button onClick={expand}>
              Expand
            </button>
            <label>Search: </label>
            <input onChange={handleSearch} />
          </div>
        <SortableTree
          treeData={treeData}
          onChange={treeData => onChange(treeData)}
          maxDepth={2}
          dndType={externalNodeType}
          searchQuery={search}
        />
        <YourExternalNodeComponent node={{ title: 'Baby Rabbit' }} />
        </div>
      </Modal.Body>
    </Modal>
    </React.Fragment>
  )
}

export default forwardRef(DragDropContext(HTML5Backend)(NavModal));
