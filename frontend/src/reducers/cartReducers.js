import {
  PUSH_ITEM_CART_REQUEST,
  CREATE_CART_REQUEST,
  CART_DETAILS_REQUEST,
  PUSH_ITEM_CART_SUCCESS,
  CREATE_CART_SUCCESS,
  CART_DETAILS_SUCCESS,
  PUSH_ITEM_CART_FAIL,
  CREATE_CART_FAIL,
  CART_DETAILS_FAIL,
  REMOVE_ITEM_CART_REQUEST,
  REMOVE_ITEM_CART_SUCCESS,
  REMOVE_ITEM_CART_FAIL,
  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,
} from "../constants/cartConstants"

export const cartDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true }

    case CART_DETAILS_SUCCESS:
      return { loading: false, cartInfo: action.payload }

    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const createCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CART_REQUEST:
      return { loading: true }

    case CREATE_CART_SUCCESS:
      return { loading: false, createInfo: action.payload }

    case CREATE_CART_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const pushItemCartReducer = (state = {}, action) => {
  switch (action.type) {
    case PUSH_ITEM_CART_REQUEST:
      return { loading: TextTrackCueList }

    case PUSH_ITEM_CART_SUCCESS:
      return { loading: false }

    case PUSH_ITEM_CART_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeItemCartReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_CART_REQUEST:
      return { loading: true }

    case REMOVE_ITEM_CART_SUCCESS:
      return { loading: false, updatedArray: action.payload }

    case REMOVE_ITEM_CART_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const clearCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CLEAR_REQUEST:
      return { loading: true }

    case CART_CLEAR_SUCCESS:
      return { loading: false, clearCart: action.payload }

    case CART_CLEAR_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
