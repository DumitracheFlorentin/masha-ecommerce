import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

// Import Components
import Navigation from "../components/Navigation"
import { cartDetailsAction } from "../actions/cartActions"

export default function Cart() {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem("masha-user-token")

  const pushItemCart = useSelector((state) => state.pushItemCart)
  const cartDetails = useSelector((state) => state.cartDetails)
  const { loading, error, cartInfo } = cartDetails

  const deleteItemHandler = () => {
    console.log("delete")
  }

  useEffect(() => {
    dispatch(cartDetailsAction(token))
  }, [dispatch, history, pushItemCart.loading, token])
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col md={8}>
            <h1 className="my-5">Cart</h1>

            <ListGroup variant="flush">
              {loading ? (
                <Loader />
              ) : error ? (
                <CustomAlert message={error} color="danger" />
              ) : (
                cartInfo &&
                cartInfo.productItems &&
                cartInfo.productItems.map((product) => {
                  const tPrice = product.price * product.qty

                  return (
                    <ListGroup.Item key={product.productId}>
                      <Row className="my-2">
                        <Col md={2}>
                          <Image src={product.image} fluid rounded />
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
                            onClick={deleteItemHandler}
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
            <h1 className="my-5">Checkout</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}
