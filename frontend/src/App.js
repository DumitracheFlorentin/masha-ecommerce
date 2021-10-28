import { Switch, Route } from "react-router-dom"

// Import Pages
import Main from "./pages/Main"
import SpecificProduct from "./pages/SpecificProduct"

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>

      <Route path="/products/:id" exact>
        <SpecificProduct />
      </Route>
    </Switch>
  )
}
