import React, {useEffect, useState} from "react"
import SortableTree, {toggleExpandedForAll, removeNodeAtPath} from "react-sortable-tree"
import {Button, Modal} from "react-bootstrap"
import BootstrapTable  from "react-bootstrap-table-next"
import {Typeahead} from 'react-bootstrap-typeahead'
import SmallButton from "../buttons/SmallButton"; // TODO replace

const TreePage = ({pages: p}) => {

  const onlyChild = (p, page) => {
    const title = page.title
    return !p.filter(page => page.children.some(child => child.title === title)).length
  }

  const [pages, setPages] = useState(p.filter(page => onlyChild(p, page) && page.onNavBar))
  const [hiddenPages, setHiddenPages] = useState(p.filter(page => !page.onNavBar))
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


  const columns = [{
    dataField: 'title',
    text: 'Title'
  }, {
    dataField: 'path',
    text: 'Path'
  }, {
    dataField: 'hidden',
    text: 'Hidden'
  }, {
    dataField: 'created_by',
    text: 'created_by'
  }, {
    dataField: 'create_date',
    text: 'create_date'
  }, {
    dataField: 'update_date',
    text: 'update_date',
  }, {
    dataField: 'update_date',
    text: 'update_date',
    headerStyle: () => { return {width: '1%'}; }
  }]

  return (
    <>
      <Typeahead
        name="newNav"
        labelKey={e => `${e.title} ${e.path}`}
        onChange={setAdding}
        options={hiddenPages}
        placeholder="Choose an employees..."
      />
      <SmallButton onClick={addNav}>Add</SmallButton>
      <div style={{ height: 400, width: 800 }}>
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
      <BootstrapTable
        keyField="id"
        data={pages}
        columns={columns}
      />
    </>
  )
}

export default TreePage