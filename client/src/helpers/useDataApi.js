import React, { useEffect, useState } from 'react';
import axios from 'axios'

const useDataApi = url => {

  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log('url', url)
    axios.get(url)
      .then(response => {
        setLoaded(true)
        setData(response.data)
      })
      .catch(err => {
        setLoaded(true)
        setError(err)
      })
  }, [])

  return [data, loaded, error]
}

export default useDataApi