import { useLocation } from "react-router-dom"

// Import Components
import Navigation from "../components/Navigation"

export default function Cart() {
  const location = useLocation()

  const id = location.pathname.split("/")[2]
  const qty = location.search.split("=")[1]

  console.log(id, qty)
  return (
    <>
      <Navigation />
    </>
  )
}
