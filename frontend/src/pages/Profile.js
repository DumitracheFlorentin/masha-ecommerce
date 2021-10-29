import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

// Import Components
import Navigation from "../components/Navigation"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"
import {
  userDetailsAction,
  updateUserAction,
  updateUserReset,
} from "../actions/userActions"

export default function Profile() {
  const dispatch = useDispatch()
  const history = useHistory()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, loggedIn } = userDetails

  const updateUser = useSelector((state) => state.updateUser)

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [password, setPassword] = useState()

  const updateUserDetailsHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateUserAction(
        localStorage.getItem("masha-user-token"),
        firstName,
        lastName,
        password
      )
    )
  }

  useEffect(() => {
    if (localStorage.getItem("masha-user-token")) {
      dispatch(userDetailsAction(localStorage.getItem("masha-user-token")))
      dispatch(updateUserReset())
    } else {
      history.push("/login")
    }
  }, [dispatch, history])

  useEffect(() => {
    if (!loading && loggedIn) {
      setFirstName(loggedIn.firstName)
      setLastName(loggedIn.lastName)
    }
  }, [loggedIn, loading])

  return (
    <>
      <Navigation />
      <Container>
        <h1 className="my-5">Your Profile</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <CustomAlert message={error} color="danger" />
        ) : loggedIn ? (
          loggedIn.id && (
            <Row>
              <Col md={3}>
                <h3 className="mb-3">Edit Informations</h3>

                <Form onSubmit={updateUserDetailsHandler}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={loggedIn.email} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" className="mt-2 mb-3">
                    Update
                  </Button>
                </Form>

                <p>NOTE: You can change one to all fields!</p>

                {updateUser && updateUser.loading ? (
                  <Loader />
                ) : updateUser.error ? (
                  <CustomAlert message={error} color="danger" />
                ) : (
                  updateUser.updatedInfo &&
                  updateUser.updatedInfo.email && (
                    <CustomAlert message="Success!" color="success" />
                  )
                )}
              </Col>
              <Col md={9}>
                <h3>Your Orders</h3>
              </Col>
            </Row>
          )
        ) : (
          loggedIn &&
          loggedIn.message && (
            <CustomAlert message={loggedIn.message} color="danger" />
          )
        )}
      </Container>
    </>
  )
}
