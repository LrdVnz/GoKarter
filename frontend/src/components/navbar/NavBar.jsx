import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

const NavBar = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [userToken] = useState(localStorage.getItem("accessToken"));

  //const [reloadingPage, setReloadingPage] = useContext()

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    //setReloadingPage(false)
    window.location.reload();
  }

  async function newRace() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;

    let formBody = {
      date: currentDate,
      users: [{ user: currentUser }],
    };

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/race/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(formBody),
    });

    if (res.status == 201) {
      window.location.reload();
    } else {
      alert("something went wrong");
    }
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <h2>GoKarter</h2>
        </Navbar.Brand>
        <Button
          className="blog-navbar-add-button bg-dark"
          size="lg"
          onClick={() => newRace()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          New Race
        </Button>
      </Container>
      <Container className="justify-content-end">
        <Navbar.Brand className="d-flex align-items-center">
          {currentUser && (
            <>
              {" "}
              <p className="fs-5 ms-2 me-2 mb-0">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt=""
                width="50px"
                height="50px"
                style={{
                  border: "solid 1px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </>
          )}
        </Navbar.Brand>
        {currentUser == null && (
          <>
            <Button as={Link} to="/login" className="bg-dark" size="lg">
              Login
            </Button>
            <Button as={Link} to="/register" className="bg-dark" size="lg">
              Register
            </Button>
          </>
        )}
        {currentUser && (
          <Button onClick={() => handleLogout()} className="bg-dark" size="lg">
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
