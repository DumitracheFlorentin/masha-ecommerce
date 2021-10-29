import { useRef, useEffect } from "react"
import { useHistory } from "react-router"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// Import Components
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

import { loggedUserAction } from "../actions/userActions"

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()

  const loggedUser = useSelector((state) => state.loggedUser)
  const { loading, error, userInfo } = loggedUser

  const loginHandler = (e) => {
    e.preventDefault()

    dispatch(
      loggedUserAction(emailRef.current.value, passwordRef.current.value)
    )
  }

  useEffect(() => {
    if (userInfo && userInfo.token) {
      localStorage.setItem("masha-user-token", userInfo.token)

      history.push("/")
    }
  }, [userInfo])

  return (
    <FormContainer>
      <h1 className="my-5">Log In</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert message={error} color="danger" />
      ) : (
        userInfo &&
        userInfo.message && (
          <CustomAlert message={userInfo.message} color="danger" />
        )
      )}

      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" ref={emailRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
        </Form.Group>
        <Button type="submit" className="mt-1">
          Log In
        </Button>
      </Form>

      <Row className="mt-4">
        <Col>
          Do not have an account? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
