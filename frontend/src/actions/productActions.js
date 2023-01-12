import axios from "axios"
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
  REGISTER_PRODUCT_REQUEST,
  REGISTER_PRODUCT_SUCCESS,
  REGISTER_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from "../constants/productConstants"

export const allProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST })

    const { data } = await axios.get("/api/products")

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const specificProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPECIFIC_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: SPECIFIC_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SPECIFIC_PRODUCT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })

    const { data } = await axios.delete(`/api/products/${id}`)

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProductAction =
  (id, name, description, image, brand, category, price, countInStock, qty) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST })

      const { data } = await axios.patch(`/api/products/${id}`, {
        name,
        description,
        image,
        brand,
        category,
        price,
        countInStock,
        qty,
      })

      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const registerProductAction = (user, name, description, brand, category, price, countInStock) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_PRODUCT_REQUEST })

      const { data } = await axios.post(`/api/products/add`, {
        user,
        name, 
        description, 
        image: '',
        brand, 
        category, 
        price, 
        countInStock
      })

      dispatch({ type: REGISTER_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: REGISTER_PRODUCT_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
