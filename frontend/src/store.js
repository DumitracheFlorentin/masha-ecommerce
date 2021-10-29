import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// Import Reducers
import {
  allProductsReducer,
  specificProductReducer,
} from "./reducers/productReducers"
import { loggedUserReducer, userDetailsReducer } from "./reducers/userReducers"

const reducer = combineReducers({
  allProducts: allProductsReducer,
  specificProduct: specificProductReducer,
  loggedUser: loggedUserReducer,
  userDetails: userDetailsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
