import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  SPECIFIC_PRODUCT_REQUEST,
  SPECIFIC_PRODUCT_SUCCESS,
  SPECIFIC_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants"

export const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const addProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SPECIFIC_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case SPECIFIC_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case SPECIFIC_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const deleteProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SPECIFIC_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case SPECIFIC_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case SPECIFIC_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const specificProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SPECIFIC_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case SPECIFIC_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case SPECIFIC_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        updatedProduct: action.payload,
      }
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
