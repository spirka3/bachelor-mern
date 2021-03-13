import React, {useEffect, useState} from "react"
import {Modal} from "react-bootstrap"
import Select from "react-select";

const NavDropdownModal = ({pages, navbar, setNavbar, showModal, setShowModal}) => {

  const [options, setOptions] = useState(getOptions());

  useEffect(() => {
    if (!navbar.children) {
      setNavbar({
        ...navbar,
        title: 'placeholder',
        children: []
      })
    }
  }, []);

  function getOptions() {
    return pages.map(p => {
      return {
        value: p.path,
        label: p.title
      }
    })
  }

  const Item = ({child}) => {
    console.log(child)

    const remove = () => {
      // remove
      setNavbar({
        ...navbar,
        children: navbar.children.filter(ch => ch.path !== child.path)
      })
      // add
      setOptions([...options, {value: child.path, label: child.title}])
    }

    return (
      <p>{child.title}<span className='pl-2' onClick={remove}>&times;</span></p>
    )
  }


  const Selector = () => {

    const handleSelect = (data) => {
      // add
      setNavbar({
        ...navbar,
        children: [
          ...navbar.children,
          {
            title: data.label,
            path: data.value
          }
        ]
      })
      // remove
      setOptions(options.filter(n => n.value !== data.value))
    }

    return (
    <Select
      options={options}
      placeholder={'put new page'}
      onChange={(data, e) => handleSelect(data, e)}
    />
    )
  }

  const Dropdown = () => (
    <div className='px-3'>
      <p contentEditable><strong>{navbar?.title}</strong></p>
      {navbar.children?.map(ch => <Item child={ch} />) }
    </div>
  )

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered
           size="sm"
    >
      <Modal.Body style={{padding: '1rem'}}>
        <Dropdown />
        <Selector />
      </Modal.Body>
    </Modal>
  )
}

export default NavDropdownModal;
