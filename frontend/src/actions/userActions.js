import axios from "axios"

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from "../constants/userConstants"

export const loggedUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST })

    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    })

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}
