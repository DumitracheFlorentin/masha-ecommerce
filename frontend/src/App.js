import { Switch, Route } from "react-router-dom"

// Import Pages
import SpecificProduct from "./pages/SpecificProduct"
import RegisterProduct from './pages/RegisterProduct'
import UpdateProduct from './pages/UpdateProduct'
import SpecificOrder from "./pages/SpecificOrder"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Cart from "./pages/Cart"


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

      <Route path="/profile/orders/:id" exact>
        <SpecificOrder />
      </Route>

      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>

      <Route path="/dashboard/products/register" exact>
        <RegisterProduct />
      </Route>

      <Route path="/dashboard/products/:id" exact>
        <UpdateProduct />
      </Route>

      <Route path="/products" exact>
        <Products />
      </Route>
    </Switch>
  )
}
