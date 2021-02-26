import {Button} from "react-bootstrap";
import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import MyModal from "../../modals/MyModal";
import CardForm from "../../forms/CardForm";
import ImageForm from "../../forms/ImageForm";
import axios from "axios";
import BuilderModule from "../BuilderModule";

const EditModal = ({module, setModule, setShowModal}) => {

  const [isDirty, setIsDirty] = useState(false)

  const {register, handleSubmit, reset} = useForm({
    defaultValues:  module.body
    // defaultValues:  useMemo(() => {
    //   return module.body;
    // }, [module])
  });

  // useEffect(() => {
  //   reset(module.body);
  // }, [module]);

  function onSubmit(data, e) {
    e.preventDefault()
    console.log(data)

    const updatedModule = {
      ...module,
      body: data
    }

    axios.patch('/modules/'+module._id, updatedModule)
      .then(response => {
        console.log(response)
        setModule(updatedModule)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const Header = () => {
    return (
      <BuilderModule module={module} showBtn={false}/>
    )
  }

  const Body = () => {
    switch(module.type) {
      case "card":
        console.log('card', module)
        return <CardForm register={register} setModule={setModule} setIsDirty={setIsDirty}/>
      case "image":
        console.log('image', module)
        return <ImageForm register={register} />
      default:
        console.log('module was not rendered', module)
    }
  }

  const Footer = () => {
    return (
      <Button variant="dark" onClick={handleSubmit(onSubmit)}>Save {module.type}</Button>
    )
  }

  return (
    <MyModal
      title={module._id}
      header={<Header/>}
      body={<Body/>}
      footer={<Footer/>}
      isDirty={isDirty}
      setShowModal={setShowModal}
    />
  )
};

export default EditModal;