import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

import { userDetailsAction, logoutAction } from "../actions/userActions"

export default function Navigation() {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const userDetails = useSelector((state) => state.userDetails)
  const { loggedIn } = userDetails

  const logoutHandler = () => {
    dispatch(logoutAction())

    history.push("/login")
  }

  useEffect(() => {
    dispatch(userDetailsAction(token))
  }, [token, dispatch])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Masha</Navbar.Brand>
          </LinkContainer>

          <Nav>
            {loggedIn && loggedIn.firstName ? (
              <>
                <NavDropdown title="Dashboard">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item type="button" onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>

                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
                    Cart
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
