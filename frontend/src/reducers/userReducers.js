import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from "../constants/userConstants"

export const loggedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true }

    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
