import {Button} from "react-bootstrap";
import React, {useState} from "react";
import MyModal from "../../modals/MyModal";
import CardForm from "../../forms/CardForm";
import ImageForm from "../../forms/ImageForm";
import {useForm} from "react-hook-form";
import axios from "axios";

const NewModal = ({pageId, moduleType, setModules, setShowModal, setLayouts}) => {

  const [isDirty, setIsDirty] = useState(false)

  const {register, handleSubmit} = useForm()

  function onSubmit(data, e) {
    e.preventDefault()
    console.log(data)

    const newModule = {
      page: pageId,
      name: "moduleXY",
      type: moduleType,
      position: {
        x: 4,
        y: 0,
        w: 2,
        h: 5,
        static: false
      },
      body: data,
      status: "active"
    }

    axios.post('/modules', newModule)
      .then(response => {
        const addedModule = response.data
        const positionWithId = {
            ...addedModule.position,
            i: addedModule._id
        }
        setModules(prev => [...prev, {
          ...addedModule,
          position: positionWithId
        }])
        setLayouts(prev => {
          return {
            lg: [...prev.lg, positionWithId]
          }
        })
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const Body = () => {
    switch(moduleType) {
      case "card":
        return <CardForm register={register} setIsDirty={setIsDirty}/>
      case "image":
        return <ImageForm register={register} setIsDirty={setIsDirty}/>
      default:
        console.log('module was not rendered', module)
    }
  }

  const Footer = () => {
    return (
      <Button variant="dark" onClick={handleSubmit(onSubmit)}>Save</Button>
    )
  }

  return (
    <MyModal
      header='New Module'
      body={<Body/>}
      footer={<Footer/>}
      isDirty={isDirty}
      setShowModal={setShowModal}
    />
  )
}

export default NewModal