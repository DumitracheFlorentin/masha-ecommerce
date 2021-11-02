import axios from "axios"
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

export const cartDetailsAction = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST })

    const { data } = await axios.get("/api/carts/details", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    dispatch({ type: CART_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCartAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CART_REQUEST })

    const { data } = await axios.post(
      "/api/carts/addCart",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    dispatch({ type: CREATE_CART_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_CART_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const pushItemCartAction =
  (access_token, productId, qty) => async (dispatch) => {
    try {
      dispatch({ type: PUSH_ITEM_CART_REQUEST })

      await axios.patch(
        "/api/carts/addItem",
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      dispatch({ type: PUSH_ITEM_CART_SUCCESS })
    } catch (error) {
      dispatch({
        type: PUSH_ITEM_CART_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const removeItemCartAction =
  (access_token, productId) => async (dispatch) => {
    try {
      dispatch({ type: REMOVE_ITEM_CART_REQUEST })

      const { data } = await axios.patch(
        "/api/carts/removeItem",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      dispatch({ type: REMOVE_ITEM_CART_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_CART_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const clearCart = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: CART_CLEAR_REQUEST })

    const { data } = await axios.patch(
      "/api/carts/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    dispatch({ type: CART_CLEAR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CART_CLEAR_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}
