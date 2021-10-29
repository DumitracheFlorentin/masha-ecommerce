import { useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"

// Import Components
import Navigation from "../components/Navigation"

export default function Cart() {
  const location = useLocation()
  const history = useHistory()

  const id = location.pathname.split("/")[2]
  const qty = location.search.split("=")[1]

  useEffect(() => {
    if (!localStorage.getItem("masha-user-token")) {
      history.push("/login")
    }
  }, [])

  return (
    <>
      <Navigation />
    </>
  )
}
