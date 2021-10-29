import { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Container, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

import { userDetailsAction } from "../actions/userActions"

export default function Navigation() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, loggedIn } = userDetails

  useEffect(() => {
    dispatch(userDetailsAction(token))
  }, [token])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Masha</Navbar.Brand>
          </LinkContainer>

          <Nav>
            {!loading && loggedIn && loggedIn.id ? (
              <>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faShoppingCart} className="mx-1" />{" "}
                    Cart
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} className="mx-1" /> Profile
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
