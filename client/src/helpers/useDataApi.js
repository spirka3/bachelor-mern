import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = url => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('url', url)
    axios.get(url)
      .then(response => {
        setIsLoaded(true);
        setData(response.data)
      })
      .catch(err => {
        setIsLoaded(true);
        setError(err);
      })
  }, [])

  return [data, isLoaded, error];
};

export default useDataApi;