import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  SPECIFIC_ORDERS_REQUEST,
  SPECIFIC_ORDERS_SUCCESS,
  SPECIFIC_ORDERS_FAIL,
} from "../constants/orderConstants"

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }

    case CREATE_ORDER_SUCCESS:
      return { loading: false, newOrder: action.payload }

    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const specificOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIFIC_ORDERS_REQUEST:
      return { loading: true }

    case SPECIFIC_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }

    case SPECIFIC_ORDERS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
