import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// Import Reducers
import {
  allProductsReducer,
  specificProductReducer,
  updateProductReducer,
  addProductReducer,
  deleteProductReducer
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
  specificOrderReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
  allProducts: allProductsReducer,
  specificProduct: specificProductReducer,
  registerProduct: addProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  loggedUser: loggedUserReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  registerUser: registerUserReducer,
  cartDetails: cartDetailsReducer,
  pushItemCart: pushItemCartReducer,
  createCart: createCartReducer,
  removeItemCart: removeItemCartReducer,
  clearCart: clearCartReducer,
  createOrder: createOrderReducer,
  specificOrders: specificOrdersReducer,
  specificOrder: specificOrderReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
