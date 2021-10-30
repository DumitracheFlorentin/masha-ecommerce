import { useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

// Import Components
import Navigation from "../components/Navigation"

export default function Cart() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const id = location.pathname.split("/")[2]
  const qty = location.search.split("=")[1]

  useEffect(() => {
    if (!localStorage.getItem("masha-user-token")) {
      history.push("/login")
    } else {
      if (id && qty) {
        console.log("Add item")
      } else {
        console.log("Watch cart")
      }
    }
  }, [dispatch, history, id, qty])

  return (
    <>
      <Navigation />
    </>
  )
}
