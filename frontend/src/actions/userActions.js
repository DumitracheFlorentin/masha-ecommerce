import axios from "axios"

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
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

export const registerUserAction =
  (email, password, firstName, lastName) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST })

      const { data } = await axios.post("/api/users/register", {
        email,
        password,
        firstName,
        lastName,
      })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const userDetailsAction = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get("/api/users/profile/details", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.message
          : error.message,
    })
  }
}
