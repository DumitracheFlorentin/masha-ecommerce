import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Container, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"

export default function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Masha</Navbar.Brand>
          </LinkContainer>

          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>
                <FontAwesomeIcon icon={faUser} className="mx-1" /> Sign In
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
                Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
