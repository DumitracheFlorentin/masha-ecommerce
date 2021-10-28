import { Switch, Route } from "react-router-dom"

// Import Pages
import Main from "./pages/Main"

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
    </Switch>
  )
}
