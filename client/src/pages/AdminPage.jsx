import React, {useState} from 'react'
import PageTable from "../components/tables/PagesTable";

const AdminPage = ({pages}) => {

  const [table, setTable] = useState('');
  const handleAccept = () => {}

  return (
    <>
      <PageTable pages={pages}/>
      {/*<PageTable pages={pages}/>*/}
    </>
  )
}

export default AdminPage