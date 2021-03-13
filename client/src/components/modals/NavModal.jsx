import React, {useEffect, useState} from "react"
import SortableTree, {toggleExpandedForAll, removeNodeAtPath} from "react-sortable-tree"
import {Button, Modal} from "react-bootstrap"
import {Typeahead} from 'react-bootstrap-typeahead'
import SmallButton from "../buttons/SmallButton"; // TODO replace

// https://frontend-collective.github.io/react-sortable-tree/?path=/story/basics--add-and-remove-nodes-programmatically
const NavModal = ({pages, setPages, closeModal}) => {

  const [hiddenPages, setHiddenPages] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [searchTerm, setSearchTerm] = useState()
  const [adding, setAdding] = useState()

  const onChange = treeData => {
    treeData.forEach(page => page.onNavBar = true)
    setPages(treeData)
  }

  const onSearchTermChange = e => setSearchTerm(e.target.value)

  const getNodeKey = ({ treeIndex }) => treeIndex

  const expand = () => {
    const expanded = !toggle
    setToggle(expanded)
    setPages(toggleExpandedForAll({treeData: pages, expanded}))
  }

  const addNav = () => {
    const newOnNav = adding[0]
    newOnNav.onNavBar = true
    setHiddenPages(hiddenPages.filter(page => page.title !== newOnNav.title))
    setPages([...pages, newOnNav])
  }

  const RemoveButton = ({node, path}) => {

    const removeChild = (removedChild) => {
      const update = []
      pages.forEach(page => {
        const children = page.children.filter(child => child._id !== removedChild._id)
        update.push({
          ...page,
          children
        })
      })
      // const update = pages.map(page => page.children.filter(child => child._id !== removedChild._id))
      setPages(update)
    }
    const hide = (_id) => {
      setPages(prev => {
        const idx = prev.findIndex(p => p._id === _id);
        prev[idx].hide = true
        return prev
      })
      console.log('hide')
    }

    function removePage() {
      const removed = pages
        .map(page => {
          if (page._id === node._id) return page
          return page.children.find(child => child._id === node._id)
        })
        .filter(p => p)
      removed.forEach(page => page.onNavBar = false)

      const children = removed
        .map(page => page.children)
        .flat()
      children.forEach(page => page.onNavBar = false)

      setHiddenPages([...hiddenPages, ...removed, ...children])
      setPages(removeNodeAtPath({treeData: pages, path, getNodeKey}))
    }

    return <button onClick={removePage}>Hide</button>
  }

  const HideButton = ({path}) => {
    // TODO hidePage from public
    function removeNav() {
      const remaining = removeNodeAtPath({pages, path, getNodeKey})
      const removed = pages.filter(n => !remaining.includes(n))
      const children = removed.map(page => page.children).flat()
      setHiddenPages([...hiddenPages, ...removed, ...children])
      setPages(remaining)
    }

    return <button>Hide</button>
  }

  const HomeButton = ({path}) => {
    // TODO save as the home page
    // TODO show onHover
    return <button>Home</button>
  }

  return (
    <React.Fragment>
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Custom pages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typeahead
          name="newNav"
          labelKey={e => `${e.title} ${e.path}`}
          onChange={setAdding}
          options={hiddenPages}
          placeholder="Choose an employees..."
        />
        <SmallButton onClick={addNav}>Add</SmallButton>
        <div style={{ height: 600, width: 800 }}>
          <SmallButton onClick={expand}> {toggle ? 'shrink' : 'expand'} </SmallButton>
          <label>Search: </label>
          <input onChange={onSearchTermChange} />
          <SortableTree
            treeData={pages}
            onChange={treeData => onChange(treeData)}
            searchQuery={searchTerm}
            maxDepth={2}
            generateNodeProps={(props) => ({
              buttons: [ <RemoveButton {...props} /> ]
            })}
          />
        </div>
      </Modal.Body>
    </Modal>
    </React.Fragment>
  )
}

export default NavModal;
