import { useEffect, useState } from "react"
import { allProductsAction } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"

// Import Components
import Loader from "./Loader"
import CustomAlert from "./CustomAlert"
import Product from "./Product"

export default function CategorizedProducts() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.allProducts)
  const { loading, products, error } = productList

  const categorizedArrays = products?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    dispatch(allProductsAction())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-5">
          <CustomAlert message={error} color="danger" />
        </div>
      ) : (
        Object.keys(categorizedArrays)?.map(category => {
          return(
            <div>
              <h1 className="mt-5">{category}</h1>
              <Row>
                {
                  categorizedArrays[category]?.map((product, index) => {
                    // only 5 products per category
                    if(index === 4) {
                      return
                    }
                    return (
                      <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          )
        })
    )}
    </>
  )
}
