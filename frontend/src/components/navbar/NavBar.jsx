import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
// import { useEffect, useState } from "react";

const NavBar = (props) => {

  /* Possible code for user login 
  const [currentAuthor, setCurrentAuthor] = useState();
  //const [reloadingPage, setReloadingPage] = useContext()

  useEffect(() => {
    setCurrentAuthor(JSON.parse(localStorage.getItem("currentAuthor")));
    if(reloadingPage === false && currentAuthor !== null ){
      setReloadingPage(true);
      window.location.reload()
    }  
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentAuthor");
    //setReloadingPage(false)
    window.location.reload();
  } */

  return (
    <Navbar expand="lg" className="blog-navbar p-2" fixed="top">
      <Container className="justify-content-between">
          <Navbar.Brand>
          <h2>GoKarter</h2>
          </Navbar.Brand>
        
      </Container>
    </Navbar>
  );
};

export default NavBar;