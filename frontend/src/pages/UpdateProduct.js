import { useRef, useEffect } from "react"
import { useHistory } from "react-router"
import { Form, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"

// Import Components
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import {
  userDetailsAction
} from "../actions/userActions"

import {
  specificProductAction,
  updateProductAction,
  allProductsAction
} from "../actions/productActions"


export default function UpdateProduct() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const nameRef = useRef()
  const descriptionRef = useRef()
  const brandRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const countInStockRef = useRef()

  const { loggedIn } = useSelector((state) => state.userDetails)
  const {loading, product} = useSelector((state) => state.specificProduct)

  if(loggedIn && !loggedIn.isAdmin) {
    history.push('/')
  }

  // functions
  const updateProductHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateProductAction(
        id,
        nameRef.current.value,
        descriptionRef.current.value,
        '',
        brandRef.current.value,
        categoryRef.current.value,
        parseInt(priceRef.current.value),
        parseInt(countInStockRef.current.value),
        0
      )
    )

    dispatch(allProductsAction())
    history.push('/dashboard')
  }

  useEffect(() => {
    dispatch(userDetailsAction(token))
    dispatch(specificProductAction(id))
  }, [token, dispatch])

  return (
    <>
      <Link to="/dashboard">
        <Button className="m-5">Go Back</Button>
      </Link>

      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
        <h1 className="my-5">Update Product</h1>

        <Form onSubmit={updateProductHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              ref={nameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              ref={descriptionRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              ref={brandRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              ref={categoryRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              ref={priceRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Stock"
              ref={countInStockRef}
            />
          </Form.Group>

          <Button type="submit" className="mt-2">
            Update
          </Button>
        </Form>
      </FormContainer>
      )}
    </>
  )
}
