import { useRef, useEffect } from "react"
import { useHistory } from "react-router"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// Import Components
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"
import {
  registerUserAction,
  registerUserResetAction,
} from "../actions/userActions"

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  const emailRef = useRef()
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const registerUser = useSelector((state) => state.registerUser)
  const { loading, error, registeredInfo } = registerUser

  const registerHandler = (e) => {
    e.preventDefault()

    dispatch(
      registerUserAction(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      )
    )
  }

  useEffect(() => {
    if (registeredInfo && registeredInfo.email) {
      history.push("/login")

      dispatch(registerUserResetAction())
    }
  }, [registeredInfo, dispatch, history])

  return (
    <>
      <Link to="/">
        <Button className="m-5">Go Back</Button>
      </Link>
      <FormContainer>
        <h1 className="my-5">Register</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <CustomAlert message={error} color="danger" />
        ) : (
          registeredInfo &&
          registeredInfo.message && (
            <CustomAlert message={registeredInfo.message} color="danger" />
          )
        )}

        <Form onSubmit={registerHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              ref={firstNameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              ref={lastNameRef}
            />
          </Form.Group>

          <Button type="submit" className="mt-1">
            Register
          </Button>
        </Form>

        <Row className="mt-4">
          <Col>
            Do you have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}
