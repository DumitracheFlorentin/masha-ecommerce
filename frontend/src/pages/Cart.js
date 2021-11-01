import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

// Import Components
import Navigation from "../components/Navigation"
import { cartDetailsAction, removeItemCartAction } from "../actions/cartActions"

export default function Cart() {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem("masha-user-token")

  const pushItemCart = useSelector((state) => state.pushItemCart)
  const cartDetails = useSelector((state) => state.cartDetails)
  const removeItemCart = useSelector((state) => state.removeItemCart)
  const { loading, error, cartInfo } = cartDetails

  const deleteItemHandler = (id) => {
    dispatch(removeItemCartAction(token, id))
  }

  const totalPrice =
    cartInfo &&
    cartInfo.productItems.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.price * currentValue.qty,
      0
    )

  const totalItems = cartInfo && cartInfo.productItems.length

  const shippingTax = totalPrice < 500 ? 100 : 25

  useEffect(() => {
    dispatch(cartDetailsAction(token))
  }, [dispatch, history, pushItemCart.loading, token, removeItemCart.loading])
  return (
    <>
      <Navigation />
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <CustomAlert message={error} color="danger" />
        ) : (
          cartInfo && (
            <Row>
              <Col md={8}>
                <h1 className="my-5">Cart</h1>
                <ListGroup variant="flush">
                  {cartInfo.productItems &&
                  cartInfo.productItems.length === 0 ? (
                    <CustomAlert
                      message="Your cart is empty!"
                      color="warning"
                    />
                  ) : (
                    cartInfo.productItems.map((product) => {
                      const tPrice = product.price * product.qty

                      return (
                        <ListGroup.Item key={product.productId}>
                          <Row className="my-2">
                            <Col md={2}>
                              <Image src={product.image} rounded fluid />
                            </Col>
                            <Col md={3}>
                              <p>
                                <strong>Name:</strong>
                              </p>
                              <h5>{product.name}</h5>
                            </Col>
                            <Col
                              md={2}
                              className="d-flex flex-column align-items-center"
                            >
                              <p>
                                <strong>Price:</strong>
                              </p>
                              <h5>${product.price}</h5>
                            </Col>
                            <Col
                              md={2}
                              className="d-flex flex-column align-items-center"
                            >
                              <p>
                                <strong>Quantity:</strong>
                              </p>
                              <h5>{product.qty}</h5>
                            </Col>
                            <Col
                              md={2}
                              className="d-flex flex-column align-items-center"
                            >
                              <p>
                                <strong>Total:</strong>
                              </p>
                              <h5>${tPrice}</h5>
                            </Col>
                            <Col
                              md={1}
                              className="d-flex flex-column align-items-center"
                            >
                              <p>
                                <strong>Delete</strong>
                              </p>
                              <h5
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  deleteItemHandler(product.productId)
                                }
                              >
                                X
                              </h5>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    })
                  )}
                </ListGroup>
              </Col>
              <Col md={4}>
                <h1 className="my-5 text-center">
                  Checkout ({totalItems}) items
                </h1>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Col className="d-flex justify-content-between">
                      <strong>SubTotal</strong>
                      <h5>${totalPrice}</h5>
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Col className="d-flex justify-content-between">
                      <strong>Shipping Tax</strong>
                      <h5>${shippingTax}</h5>
                    </Col>
                  </ListGroup.Item>

                  {totalPrice !== 0 && (
                    <ListGroup.Item>
                      <Col className="d-flex justify-content-between">
                        <strong>Total</strong>

                        <h5>${shippingTax + totalPrice}</h5>
                      </Col>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                <Row className="p-2">
                  <Button
                    type="button"
                    className={totalPrice === 0 && "disabled"}
                  >
                    Place Order
                  </Button>
                </Row>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  )
}
