import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({ darkMode, onToggleDarkMode }) {
  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="navbar-brand-text">AI Cafeteria</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center">
            <NavDropdown title="Menu" id="menu-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/menu">Main Menu</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/beverages">Beverages</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/snacks">Snacks</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dessert">Dessert</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/daily-meal">Daily Meal</Nav.Link>
            <Nav.Link as={Link} to="/recommend">Recommendations</Nav.Link>
            <Nav.Link as={Link} to="/chat">AI Chatbot</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Button
              type="button"
              variant={darkMode ? "outline-light" : "outline-dark"}
              className="ms-lg-3 mt-2 mt-lg-0"
              onClick={onToggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
