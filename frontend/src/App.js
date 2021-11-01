import { Switch, Route } from "react-router-dom"

// Import Pages
import Main from "./pages/Main"
import SpecificProduct from "./pages/SpecificProduct"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Checkout from "./pages/Checkout"

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>

      <Route path="/products/:id" exact>
        <SpecificProduct />
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Register />
      </Route>

      <Route path="/profile" exact>
        <Profile />
      </Route>

      <Route path="/cart" exact>
        <Cart />
      </Route>

      <Route path="/cart/checkout" exact>
        <Checkout />
      </Route>
    </Switch>
  )
}
