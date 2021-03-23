import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory, Link, NavLink } from "react-router-dom";

import "./NavMenu.css";
import Button from "react-bootstrap/Button";

export function NavMenu(props) {
  const history = useHistory();
  const handleLoginClick = () => history.push("/login");
  const handleRegisterClick = () => history.push("/register");
  const handleLogoutClick = () => callLogout();

  const callLogout = async () => {
    const requestOptions = {
      method: "POST",
    };

    await fetch(
      "https://localhost:5001/api/authentication/logout",
      requestOptions
    )
      .then(() => {
        props.onLoggedIn(false, null);
        history.push("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const styles = {
    navLinkNotActive: {
      color: "#00000080",
      textDecoration: "none",
      paddingLeft: "5px",
      paddingRight: "5px",
    },
    navLinkActive: {
      color: "#000000e6",
    },
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Programming Game Ui
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              exact
              to="/"
              style={styles.navLinkNotActive}
              activeStyle={styles.navLinkActive}
            >
              Home
            </NavLink>
            <NavLink
              to="/playground"
              style={styles.navLinkNotActive}
              activeStyle={styles.navLinkActive}
            >
              Playground
            </NavLink>
            <NavLink
              to="/ladder"
              style={styles.navLinkNotActive}
              activeStyle={styles.navLinkActive}
            >
              Ladder
            </NavLink>
            {props.loggedIn ? (
              <div>
                <NavLink
                  to="/riddles"
                  style={styles.navLinkNotActive}
                  activeStyle={styles.navLinkActive}
                >
                  Riddles
                </NavLink>
              </div>
            ) : null}
          </Nav>
          <div>
            {props.loggedIn ? (
              <div>
                <span style={{ marginRight: "10px" }}>
                  Hello, {props.loggedUser?.userName}!
                </span>
                <Button onClick={handleLogoutClick}>Log out</Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handleLoginClick}
                  style={{ marginRight: "5px" }}
                  disabled={props.loggedIn}
                >
                  {props.loggedIn}
                  Login
                </Button>
                <Button onClick={handleRegisterClick}>Sign up</Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
