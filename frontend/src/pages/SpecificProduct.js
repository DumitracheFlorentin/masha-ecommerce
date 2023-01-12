import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap"
import { useParams } from "react-router-dom"
import { specificProductAction } from "../actions/productActions"
import { userDetailsAction } from "../actions/userActions"
import { pushItemCartAction } from "../actions/cartActions"

// Import Components
import Navigation from "../components/Navigation"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"

export default function SpecificProduct() {
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const specificProduct = useSelector((state) => state.specificProduct)
  const { loggedIn } = useSelector((state) => state.userDetails)
  const { loading, product, error } = specificProduct
  const [qty, setQty] = useState(1)
  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const qtyArray = []

  if (!loading && product) {
    for (let i = 0; i < product.countInStock; i++) {
      qtyArray[i] = i + 1
    }
  }

  const addToCartHandler = () => {
    if (localStorage.getItem("masha-user-token")) {
      dispatch(
        pushItemCartAction(
          localStorage.getItem("masha-user-token"),
          params.id,
          qty
        )
      )
      history.push(`/cart`)
    } else {
      history.push(`/login`)
    }
  }

  const addToFavoriteHandler = () => {
    if (!localStorage.getItem("masha-user-token")) {
      history.push(`/login`)
    }

    const favoriteLocalStorage = JSON.parse(localStorage.getItem("masha-user-favorite-list"))
    
    if(favoriteLocalStorage && !favoriteLocalStorage[loggedIn.id]) {
      favoriteLocalStorage[loggedIn.id] = []
    }
    const hasFavorite = favoriteLocalStorage && favoriteLocalStorage[loggedIn.id].some(item => item.id === params.id)

    if(!hasFavorite) {
      favoriteLocalStorage[loggedIn.id] = [...favoriteLocalStorage[loggedIn.id], {
        id: product._id,
        name: product.name
      }]
    }

    localStorage.setItem("masha-user-favorite-list", JSON.stringify(favoriteLocalStorage))
    history.push(`/profile`)
  }

  useEffect(() => {
    dispatch(specificProductAction(params.id))
    dispatch(userDetailsAction(token))

    if (localStorage.getItem("masha-security-cart")) {
      localStorage.removeItem("masha-security-cart")
    }
  }, [dispatch, params.id])

  return (
    <>
      <Navigation />
      <Container className="mt-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <CustomAlert message={error} color="danger" />
        ) : (
          <Row className="justify-content-between">
            <Col md={6}>
              <h1>{product.name}</h1>

              <Image
                className="my-3"
                src={product.image}
                alt={product.name}
                fluid
              />

              <h4 className="mt-3">Description</h4>
              <p>{product.description}</p>
            </Col>
            <Col md={4} className="mx-5">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Add To Cart</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty: </Col>

                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {qtyArray.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        type="button"
                        disabled={parseInt(product.countInStock) === 0 && true}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        disabled={parseInt(product.countInStock) === 0 && true}
                        onClick={addToFavoriteHandler}
                      >
                        Favorite
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}
