import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Petstore API Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/pets" 
              active={location.pathname === '/' || location.pathname === '/pets'}
            >
              Pets
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/store" 
              active={location.pathname === '/store'}
            >
              Store
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/users" 
              active={location.pathname === '/users'}
            >
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;