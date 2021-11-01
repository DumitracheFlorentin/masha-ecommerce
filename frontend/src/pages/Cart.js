import { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Image } from "react-bootstrap"

// Import Components
import Navigation from "../components/Navigation"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"
import { pushItemCartAction, cartDetailsAction } from "../actions/cartActions"

export default function Cart() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [lastKey, setLastKey] = useState()
  const [totalPrice, setTotalPrice] = useState(0)

  console.log(location.key)
  console.log(lastKey)

  const id = location.pathname.split("/")[2]
  const qty = location.search.split("=")[1]

  const updateCart = useSelector((state) => state.pushItemCart)
  const cartProducts = useSelector((state) => state.cartDetails)
  const { loading, error, cartInfo } = cartProducts

  useEffect(() => {
    if (!localStorage.getItem("masha-user-token")) {
      history.push("/login")
    } else {
      if (id && qty && !localStorage.getItem("masha-security-cart")) {
        dispatch(
          pushItemCartAction(localStorage.getItem("masha-user-token"), id, qty)
        )

        if (!updateCart.loading) {
          dispatch(cartDetailsAction(localStorage.getItem("masha-user-token")))
        }
      } else {
        dispatch(cartDetailsAction(localStorage.getItem("masha-user-token")))
      }

      localStorage.setItem("masha-security-cart", location.key)
    }
  }, [dispatch, history, id, qty, updateCart.loading])

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col md={8}>
            <h1 className="my-5">Cart</h1>

            {loading ? (
              <Loader />
            ) : error ? (
              <CustomAlert message={error} color="danger" />
            ) : (
              cartInfo &&
              cartInfo.productItems &&
              cartInfo.productItems.map((product) => {
                const tPrice = product.qty * product.price

                return (
                  <Row className="mt-4">
                    <Col md={2}>
                      <Image src={product.image} fluid />
                    </Col>
                    <Col md={2}>
                      <h5>Name:</h5>
                      <p>{product.name}</p>
                    </Col>
                    <Col md={2}>
                      <h5>Price:</h5>
                      <p>${product.price}</p>
                    </Col>
                    <Col md={2}>
                      <h5>Quantity:</h5>
                      <p>{product.qty}</p>
                    </Col>
                    <Col md={3}>
                      <h5>Total:</h5>
                      <p>
                        {product.price} x {product.qty} = ${tPrice}
                      </p>
                    </Col>
                  </Row>
                )
              })
            )}
          </Col>
          <Col md={4}>
            <h1 className="my-5">Checkout</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}
