import React, {useEffect, useState} from "react";
import SortableTree, {toggleExpandedForAll} from "react-sortable-tree";
import {Button, ButtonGroup, Modal} from "react-bootstrap";


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
          searchQuery={search}
        />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default NavModal;
