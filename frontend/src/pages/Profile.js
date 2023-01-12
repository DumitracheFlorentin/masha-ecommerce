import { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

// Import Components
import Navigation from "../components/Navigation"
import Loader from "../components/Loader"
import CustomAlert from "../components/CustomAlert"
import {
  userDetailsAction,
  updateUserAction,
  updateUserReset,
} from "../actions/userActions"
import { specificOrdersAction } from "../actions/orderActions"

export default function Profile() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = localStorage.getItem("masha-user-token")

  const userDetails = useSelector((state) => state.userDetails)
  const specificOrders = useSelector((state) => state.specificOrders)
  const { loading, error, loggedIn } = userDetails

  const updateUser = useSelector((state) => state.updateUser)
  const updateProduct = useSelector((state) => state.updateProduct)

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [password, setPassword] = useState()
  const [favorites, setFavorites] = useState([])

  const updateUserDetailsHandler = (e) => {
    e.preventDefault()

    dispatch(updateUserAction(token, firstName, lastName, password))
  }

  const removeFromFavorite = (id) => {
    const newFavorites = favorites.filter(item => item.id !== id)
    setFavorites(newFavorites)

    const computedLocalStorage = JSON.parse(localStorage.getItem('masha-user-favorite-list'))

    computedLocalStorage[loggedIn.id] = newFavorites

    localStorage.setItem('masha-user-favorite-list', JSON.stringify(computedLocalStorage))
  }

  useEffect(() => {
    if (token) {
      dispatch(specificOrdersAction(token))
    } else {
      history.push("/login")
    }
  }, [updateProduct, token, history, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(specificOrdersAction(token))
      dispatch(userDetailsAction(token))
      dispatch(updateUserReset())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, token])

  useEffect(() => {
    if (!loading && loggedIn) {
      setFirstName(loggedIn.firstName)
      setLastName(loggedIn.lastName)
    }

    loggedIn && setFavorites(JSON.parse(localStorage.getItem('masha-user-favorite-list'))[loggedIn.id])
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
                <Row>
                <h3>Your Orders</h3>

                {specificOrders.loading ? (
                  <Loader />
                ) : specificOrders.error ? (
                  <CustomAlert message={specificOrders.error} color="danger" />
                ) : specificOrders.orders &&
                  specificOrders.orders.length === 0 ? (
                  <CustomAlert
                    message="You do not have any orders"
                    color="warning"
                  />
                ) : (
                  <ListGroup variant="flush">
                    {specificOrders.orders &&
                      specificOrders.orders.length > 0 &&
                      specificOrders.orders.map((order, index) => {
                        const orderDate = new Date(order.createdAt)

                        return (
                          <ListGroup.Item key={order._id}>
                            <Link
                              to={`/profile/orders/${order._id}`}
                              className="linkClass "
                            >
                              <Row className="orderHover pt-3">
                                <Col md={1}>
                                  <strong>Nr.</strong>
                                  <p>{index + 1}</p>
                                </Col>
                                <Col md={4}>
                                  <strong>Order Id</strong>
                                  <p>{order._id}</p>
                                </Col>
                                <Col
                                  md={2}
                                  className="d-flex flex-column align-items-center"
                                >
                                  <strong>Price</strong>
                                  <p>
                                    $
                                    {parseInt(order.shippingTax) +
                                      parseInt(order.totalPrice)}
                                  </p>
                                </Col>
                                <Col
                                  md={2}
                                  className="d-flex flex-column align-items-center"
                                >
                                  <strong>Date</strong>
                                  <p>{orderDate.toLocaleDateString("en-US")}</p>
                                </Col>
                                <Col
                                  md={1}
                                  className="d-flex flex-column align-items-center"
                                >
                                  <strong>Paid</strong>
                                  <p>
                                    <FontAwesomeIcon
                                      icon={order.isPaid ? faCheck : faTimes}
                                      className="mx-2"
                                    />
                                  </p>
                                </Col>
                                <Col
                                  md={2}
                                  className="d-flex flex-column align-items-center"
                                >
                                  <strong>Delivered</strong>
                                  <p>
                                    <FontAwesomeIcon
                                      icon={
                                        order.isDelivered ? faCheck : faTimes
                                      }
                                      className="mx-2"
                                    />
                                  </p>
                                </Col>
                              </Row>
                            </Link>
                          </ListGroup.Item>
                        )
                      })}
                  </ListGroup>
                )}
                </Row>
                <Row>
                <h3 className="mt-5 mb-3">Your Favorites</h3>

                <ListGroup variant="flush">
                  {favorites && favorites.length ? favorites.map((favorite, index) => {
                    return (
                      <ListGroup.Item key={favorite.id}>
                          <Row className="orderHover pt-3">
                            <Col md={2}>
                              <Link
                                to={`/products/${favorite.id}`}
                              >
                                <strong>Nr.</strong>
                                <p>{index + 1}</p>
                              </Link>
                            </Col>
                            <Col md={5}>
                              <Link
                                to={`/products/${favorite.id}`}
                              >
                                <strong>Product ID</strong>
                                <p>{favorite.id}</p>
                              </Link>
                            </Col>
                            <Col md={3}>
                              <Link
                                to={`/products/${favorite.id}`}
                              >
                                <strong>Product Name</strong>
                                <p>{favorite.name}</p>
                              </Link>
                            </Col>
                            <Col md={2}>
                              <button className="btn btn-danger" onClick={() => removeFromFavorite(favorite.id)}>Delete</button>
                            </Col>
                          </Row>
                      </ListGroup.Item>
                    )
                  }): (
                    <CustomAlert
                      message="You do not have any favorites"
                      color="warning"
                    />
                  )}
                </ListGroup>
                </Row>
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
