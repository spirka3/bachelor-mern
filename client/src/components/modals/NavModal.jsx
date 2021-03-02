import React, {useEffect, useState} from "react";
import SortableTree, {toggleExpandedForAll, removeNodeAtPath} from "react-sortable-tree";
import {Button, Modal} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead' // TODO replace

const NavModal = ({pages, setPages, hiddenPages, setHiddenPages, closeModal}) => {

  const [treeData, setTreeData] = useState([])
  const [toggle, setToggle] = useState(false)
  const [searchTerm, setSearchTerm] = useState()
  const [adding, setAdding] = useState()
  
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

  const addNav = (adding) => {
    const newOnNav = adding[0]
    newOnNav.onNavBar = true
    setHiddenPages(hiddenPages.filter(page => page.title !== newOnNav.title))
    setTreeData([...treeData, newOnNav])
    setPages([...pages, newOnNav])
  }

  const RemoveButton = ({path}) => {
    const removeNav = () => {
      const rest = removeNodeAtPath({treeData, path, getNodeKey})
      const removed = treeData - rest // todo ... a potom este hiddenPages + removed :D :D prezatial
      console.log(removed)
      setTreeData(rest)
    }
    // todo
    return <button onClick={removeNav}>Remove</button>
  }
  
  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
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

  const getNodeKey = ({ treeIndex }) => treeIndex

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
            <input onChange={onSearchTermChange} />
          </div>
        <SortableTree
          treeData={treeData}
          onChange={treeData => onChange(treeData)}
          searchQuery={searchTerm}
          maxDepth={2}
          generateNodeProps={({ path }) => ({
            buttons: [ <RemoveButton path={path} /> ]
          })}
        />
        </div>
        <Typeahead
          name="newNav"
          labelKey={e => `${e.title} ${e.path}`}
          onChange={addNav}
          options={hiddenPages}
          placeholder="Choose an employees..."
        />
      </Modal.Body>
    </Modal>
    </React.Fragment>
  )
}

export default NavModal;
