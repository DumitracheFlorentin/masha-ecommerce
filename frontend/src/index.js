import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router } from "react-router-dom"

// Import Redux
import { Provider } from "react-redux"
import store from "./store"

// Import Bootstrap Theme
import "./bootstrap.min.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()
