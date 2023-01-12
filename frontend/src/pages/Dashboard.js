import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// css
import { ListGroup, Row, Col, Container } from "react-bootstrap"

// components
import Navigation from "../components/Navigation"
import CustomAlert from "../components/CustomAlert"
import Loader from "../components/Loader"


// actions
import { userDetailsAction } from "../actions/userActions"
import {
  allProductsAction, 
  deleteProductAction
} from "../actions/productActions"

export default function Dashboard () {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const token = localStorage.getItem("masha-user-token")
    ? localStorage.getItem("masha-user-token")
    : null

  const { loggedIn } = useSelector((state) => state.userDetails)
  let { loading, products, error } = useSelector((state) => state.allProducts)

  if(loggedIn && !loggedIn.isAdmin) {
    history.push('/')
  }

  // functions
  const goToAddProductPage = () => {
    history.push("/dashboard/products/register");
  }

  const deleteSpecificProduct = async (id) => {
    await dispatch(deleteProductAction(id))
    await dispatch(allProductsAction())
  }

  const updateSpecificProduct = (id) => {
    history.push(`/dashboard/products/${id}`);
  }

  useEffect(() => {
    dispatch(userDetailsAction(token))
    dispatch(allProductsAction())
  }, [token, dispatch])

  return (
    <>
      <Navigation />

      <div>
        <Container>
          <h2 className="mt-5">All Products</h2>

          <button className="btn btn-primary my-4" onClick={goToAddProductPage}>Add product</button>
        
          <ListGroup variant="flush">
            {loading ? (
            <Loader />
          ) : error ? (
            <CustomAlert message={error} color="danger" />
          ) : products && products.map((product, index) => {
              return (
                <ListGroup.Item key={product._id}>
                  <Row className="orderHover pt-3">
                    <Col md={1}>
                      <Link to={`/products/${product._id}`}>
                        <strong>Nr.</strong>
                        <p>{index + 1}</p>
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${product._id}`}>
                        <strong>Product Id</strong>
                        <p>{product._id}</p>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <Link to={`/products/${product._id}`}>
                        <strong>Product Name</strong>
                        <p>{product.name}</p>
                      </Link>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <strong>Price</strong>
                      <p>
                        $
                        {parseInt(product.price)}
                      </p>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <strong>Stock</strong>
                      <p>
                        {parseInt(product.countInStock)}
                      </p>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <strong>Brand</strong>
                      <p>
                        {product.brand}
                      </p>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <strong>Category</strong>
                      <p>
                        {product.category}
                      </p>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <button className="btn btn-success" onClick={async () => updateSpecificProduct(product._id)}>Edit</button>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex flex-column align-items-center"
                    >
                      <button className="btn btn-danger" onClick={async () => deleteSpecificProduct(product._id)}>Delete</button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Container>  
      </div>
    </>
  );
};