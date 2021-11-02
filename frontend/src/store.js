import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// Import Reducers
import {
  allProductsReducer,
  specificProductReducer,
} from "./reducers/productReducers"
import {
  loggedUserReducer,
  userDetailsReducer,
  registerUserReducer,
  updateUserReducer,
} from "./reducers/userReducers"

import {
  cartDetailsReducer,
  pushItemCartReducer,
  createCartReducer,
  removeItemCartReducer,
  clearCartReducer,
} from "./reducers/cartReducers"

import {
  createOrderReducer,
  specificOrdersReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
  allProducts: allProductsReducer,
  specificProduct: specificProductReducer,
  loggedUser: loggedUserReducer,
  userDetails: userDetailsReducer,
  registerUser: registerUserReducer,
  updateUser: updateUserReducer,
  cartDetails: cartDetailsReducer,
  pushItemCart: pushItemCartReducer,
  createCart: createCartReducer,
  removeItemCart: removeItemCartReducer,
  clearCart: clearCartReducer,
  createOrder: createOrderReducer,
  specificOrders: specificOrdersReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
