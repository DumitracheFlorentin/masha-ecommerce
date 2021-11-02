import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Image,
} from "react-bootstrap"

// Import Components
import { cartDetailsAction, clearCart } from "../actions/cartActions"
import { userDetailsAction } from "../actions/userActions"
import { createOrderAction } from "../actions/orderActions"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

export default function Checkout() {
  const phoneRef = useRef()
  const addressRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  const token = localStorage.getItem("masha-user-token")
  const cartDetails = useSelector((state) => state.cartDetails)
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, cartInfo } = cartDetails

  const totalPrice =
    cartDetails &&
    cartDetails.cartInfo &&
    cartDetails.cartInfo.productItems &&
    cartDetails.cartInfo.productItems.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.price * currentValue.qty,
      0
    )

  const shippingTax = totalPrice < 500 ? 100 : 25

  const createOrderHandler = (phone, address, shippingTax, totalPrice) => {
    dispatch(createOrderAction(token, phone, address, shippingTax, totalPrice))

    if (phoneRef.current.value && addressRef.current.value) {
      dispatch(clearCart(token))

      history.push("/profile")
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(cartDetailsAction(token))
      dispatch(userDetailsAction(token))
    } else {
      history.push("/login")
    }
  }, [token, dispatch, history])

  useEffect(() => {
    if (!loading && cartInfo && cartInfo.productItems.length === 0) {
      history.push("/cart")
    }
  }, [history, loading, cartInfo])

  return (
    <Container>
      <Button className="mt-5" onClick={() => history.push("/cart")}>
        Go back
      </Button>
      <h1 className="mt-5">Checkout Process</h1>
      <h3 className="mt-5">1. Account Information</h3>

      {userDetails.loading ? (
        <Loader />
      ) : userDetails.error ? (
        <CustomAlert message={userDetails.error} color="danger" />
      ) : (
        <Form className="mt-4">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userDetails.loggedIn && userDetails.loggedIn.email}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number..."
                ref={phoneRef}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={userDetails.loggedIn && userDetails.loggedIn.firstName}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={userDetails.loggedIn && userDetails.loggedIn.lastName}
                disabled
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address..."
                ref={addressRef}
              />
            </Form.Group>
          </Row>
        </Form>
      )}

      <h3 className="mt-5">2. Products Information</h3>

      {cartDetails.loading ? (
        <Loader />
      ) : cartDetails.error ? (
        <CustomAlert message={cartDetails.error} color="danger" />
      ) : (
        <ListGroup variant="flush">
          {cartDetails &&
            cartDetails.cartInfo &&
            cartInfo.productItems &&
            cartInfo.productItems &&
            cartInfo.productItems.map((product) => {
              const tPrice = product.price * product.qty

              return (
                <ListGroup.Item key={product.productId}>
                  <Row className="my-2">
                    <Col md={1}>
                      <Link to={`/products/${product.productId}`}>
                        <Image src={product.image} rounded fluid />
                      </Link>
                    </Col>

                    <Col md={5} style={{ cursor: "pointer" }}>
                      <Link
                        className="linkClass"
                        to={`/products/${product.productId}`}
                      >
                        <p>
                          <strong>Name</strong>
                        </p>
                        <h5>{product.name}</h5>
                      </Link>
                    </Col>

                    <Col
                      md={2}
                      className="d-flex flex-column align-items-center"
                    >
                      <p>
                        <strong>Price</strong>
                      </p>
                      <h5>${product.price}</h5>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex flex-column align-items-center"
                    >
                      <p>
                        <strong>Quantity</strong>
                      </p>
                      <h5>{product.qty}</h5>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex flex-column align-items-center"
                    >
                      <p>
                        <strong>Total</strong>
                      </p>
                      <h5>${tPrice}</h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
        </ListGroup>
      )}

      <h3 className="mt-5">3. Shipping Informations</h3>

      <Row className="mt-3">
        <Col>
          Shipping Tax:
          <strong> ${shippingTax}</strong>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h5>Note:</h5>
          <p>This cost is provided by the couriers that we have a contract!</p>
          <p>
            Also, if your order is below $500 you will pay $100 more. In case
            your order is higher than $500 you will pay only $25!
          </p>
        </Col>
      </Row>

      <Row className="mt-3 mb-5">
        <Button
          variant="success"
          type="button"
          onClick={() =>
            createOrderHandler(
              phoneRef.current.value,
              addressRef.current.value,
              shippingTax,
              totalPrice
            )
          }
        >
          Place Order (${totalPrice + shippingTax})
        </Button>
      </Row>
    </Container>
  )
}
