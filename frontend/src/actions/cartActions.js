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
  (access_token, productId, image, name, qty, price) => async (dispatch) => {
    try {
      dispatch({ type: PUSH_ITEM_CART_REQUEST })

      const { data } = await axios.patch(
        "/api/carts/addItem",
        { productId, image, name, qty, price },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      dispatch({ type: PUSH_ITEM_CART_SUCCESS, payload: data })
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
