import { useEffect } from "react"
import { allProductsAction } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"

// Import Components
import Loader from "./Loader"
import CustomAlert from "./CustomAlert"
import Product from "./Product"

export default function Products() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.allProducts)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(allProductsAction())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert message={error} color="danger" />
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
