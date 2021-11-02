import { useEffect } from "react"
import { useHistory, useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Button,
  Form,
  Col,
  Row,
  ListGroup,
  Image,
} from "react-bootstrap"

// Import Components
import { specificOrderAction } from "../actions/orderActions"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

export default function SpecificOrder() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const token = localStorage.getItem("masha-user-token")
  const orderId = location.pathname.split("/")[3] || undefined

  const specificOrder = useSelector((state) => state.specificOrder)
  const { loading, error, order } = specificOrder

  useEffect(() => {
    if (token && orderId) {
      dispatch(specificOrderAction(token, orderId))
    } else {
      history.push("/login")
    }
  }, [token, history, dispatch, orderId])

  return (
    <Container>
      <Button className="mt-5" onClick={() => history.push("/profile")}>
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert message={error} color="danger" />
      ) : (
        <>
          <h1 className="mt-5">Order Nr. {order && order._id}</h1>

          <h3 className="mt-5">1. Account Information</h3>

          <Form className="mt-4">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={order && order.email}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={order && order.phone}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={order && order.firstName}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={order && order.lastName}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={order && order.address}
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>

          <h3 className="mt-5">2. Products Information</h3>

          <ListGroup variant="flush">
            {order &&
              order.products &&
              order.products.map((product) => {
                const tPrice = product.qty * product.price

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

          <h3 className="mt-5">3. Taxes Information</h3>

          <Form>
            <Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>Shipping Tax</Form.Label>
                <Form.Control
                  type="text"
                  value={order && `$ ${order.shippingTax}`}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>Subtotal</Form.Label>
                <Form.Control
                  type="text"
                  value={order && `$ ${order.totalPrice}`}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    order &&
                    `$ ${
                      parseInt(order.totalPrice) + parseInt(order.shippingTax)
                    }`
                  }
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>

          <h3 className="mt-5">4. Order Details</h3>

          <Form className="mb-5">
            <Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>Paid</Form.Label>
                <Form.Control
                  type="text"
                  value={order && order.isPaid ? "Paid" : "Not Paid"}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>Delivered</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    order && order.isDelivered ? "Delivered" : "Not Delivered"
                  }
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>
        </>
      )}
    </Container>
  )
}
