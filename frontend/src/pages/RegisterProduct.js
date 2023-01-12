import { useRef, useEffect } from "react"
import { useHistory } from "react-router"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"

// components
import FormContainer from "../components/FormContainer"

// actions
import { userDetailsAction } from "../actions/userActions"
import { registerProductAction } from "../actions/productActions"

export default function RegisterProduct() {
  const history = useHistory()
  const dispatch = useDispatch()

  const nameRef = useRef()
  const descriptionRef = useRef()
  const brandRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const countInStockRef = useRef()

  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const { loggedIn } = useSelector((state) => state.userDetails)

  if(loggedIn && !loggedIn.isAdmin) {
    history.push('/')
  }

  // functions
  const registerHandler = (e) => {
    e.preventDefault()

    dispatch(
      registerProductAction(
        loggedIn ? loggedIn.id : '',
        nameRef.current.value,
        descriptionRef.current.value,
        brandRef.current.value,
        categoryRef.current.value,
        priceRef.current.value,
        countInStockRef.current.value
      )
    )

    history.push('/dashboard')
  }

  useEffect(() => {
    dispatch(userDetailsAction(token))
  }, [token, dispatch])

  return (
    <>
      <Link to="/dashboard">
        <Button className="m-5">Go Back</Button>
      </Link>
      <FormContainer>
        <h1 className="my-5">Add Product</h1>

        <Form onSubmit={registerHandler}>
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
            Register
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
