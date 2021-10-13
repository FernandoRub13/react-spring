import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar  bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to={'/'} >React Java</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-menu" />
      <Navbar.Collapse direction="horizontal" id="main-menu" >
        <Nav  >
          <Nav.Link>Create Post</Nav.Link>
        </Nav>
        <Nav className="ms-auto" >
          <Nav.Link>Create account</Nav.Link>
          <Nav.Link as={Link} to={'/signin'} >Sign In</Nav.Link>
          <NavDropdown title="Fernando Rubio" id="menu-dropdown" >
            <NavDropdown.Item>Posts</NavDropdown.Item>
            <NavDropdown.Item>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

