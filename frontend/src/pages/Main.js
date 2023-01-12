import { Container } from "react-bootstrap"

// Import Components
import Navigation from "../components/Navigation"
import Products from "../components/Products"

export default function Main() {
  return (
    <>
      <Navigation />
      <Container>
        <Products />
      </Container>
    </>
  )
}
