import React, {useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {Container} from "react-bootstrap"
import './App.css'

import Navigation from "./components/Navigation.jsx"
import Footer from "./components/Footer.jsx"
import Routes from "./Routes"
import Header from "./components/toolbar/Header";
import Dashboard from "./components/toolbar/Dash";

function App() {

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(prevState => !prevState)
  };

  const openDrawer = () => {
    setShowDrawer(true)
  };

  return (
    <Router>
      {/*<Header />*/}
      <Navigation/>
      {/*<Dashboard/>*/}
      <Container>
        <Routes/>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
