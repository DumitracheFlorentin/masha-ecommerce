import { Container } from "react-bootstrap"

// Import Components
import Navigation from "../components/Navigation"
import CategorizedProducts from "../components/CategorizedProducts"

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <Container>
        <CategorizedProducts />
      </Container>
    </>
  )
}