import axios from "axios"
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  SPECIFIC_ORDERS_REQUEST,
  SPECIFIC_ORDERS_SUCCESS,
  SPECIFIC_ORDERS_FAIL,
} from "../constants/orderConstants"

export const createOrderAction =
  (access_token, phone, address, shippingTax, totalPrice) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST })

      const { data } = await axios.post(
        "/api/orders/create",
        { phone, address, shippingTax, totalPrice },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const specificOrdersAction = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: SPECIFIC_ORDERS_REQUEST })

    const { data } = await axios.get("/api/orders/specific", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    dispatch({ type: SPECIFIC_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SPECIFIC_ORDERS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}
