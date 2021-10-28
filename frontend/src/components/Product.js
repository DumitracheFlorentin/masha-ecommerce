import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Product({ product }) {
  return (
    <Card className="rounded my-3 p-3 card">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          className="rounded product__image"
          variant="top"
          src={product.image}
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`} className="product__link">
          <Card.Title className="product__title">{product.name}</Card.Title>
        </Link>
        <Card.Text as="h3" className="mt-3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
