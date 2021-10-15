import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../actions/authActions'

const Navigation = () => {
  const { user, loggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          React Java
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-menu" />
        <Navbar.Collapse direction="horizontal" id="main-menu">
          <Nav>
            {loggedIn && <Nav.Link as={Link} to={'/new/post'} >Create Post</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
            {!loggedIn ? (
              <>
                <Nav.Link as={Link} to={'/signup'}>Sign Up</Nav.Link>
                <Nav.Link as={Link} to={'/signin'}>
                  Sign In
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={user.sub} id="menu-dropdown">
                <NavDropdown.Item  as={Link} to={'/posts'}>Posts</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>dispatch(logOutUser())} >Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
