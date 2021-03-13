import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./main.css";

import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import Routes from "./Routes";
import { FetchError, FetchLoading } from "./components/others/FetchComponents";
import axios from "axios";

function App() {
  const [pages, setPages] = useState();
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("url", "pages");
    axios
      .get("/pages")
      .then((response) => {
        setLoaded(true);
        setPages(response.data);
      })
      .catch((err) => {
        setLoaded(true);
        setError(err);
      });
  }, []);

  if (error) return <FetchError e={error.message} />;
  if (!loaded || !pages) return <FetchLoading />;

  return (
    <Router>
      <Navigation pages={pages} />
      <Container>
        <Routes pages={pages} />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
