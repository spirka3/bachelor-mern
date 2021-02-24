import React, {useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {Container} from "react-bootstrap"
import './App.css'

import Navigation from "./components/Navigation.jsx"
import Footer from "./components/Footer.jsx"
import Routes from "./Routes"
import Header from "./components/toolbar/Header";
import Dashboard from "./components/toolbar/Dash";
import useDataApi from "./helpers/useDataApi";
import {FetchError, FetchLoading} from "./components/others/FetchComponents";

function App() {

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(prevState => !prevState)
  };

  const openDrawer = () => {
    setShowDrawer(true)
  };

  const [pages, isLoaded, error] = useDataApi('/pages');

  if (error) {
    return <FetchError e={`Error: ${error.message}`}/>
  } else if (!isLoaded || !pages) {
    return <FetchLoading/>
  }

  return (
    <Router>
      {/*<Header />*/}
      <Navigation pages={pages}/>
      {/*<Dashboard/>*/}
      <Container>
        <Routes pages={pages}/>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
