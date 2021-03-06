import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants"

export const loggedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true }

    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload }

    case LOGIN_USER_RESET:
      return {}

    default:
      return state
  }
}

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true }

    case REGISTER_USER_SUCCESS:
      return { loading: false, registeredInfo: action.payload }

    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload }

    case REGISTER_USER_RESET:
      return {}

    default:
      return state
  }
}

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true }

    case USER_DETAILS_SUCCESS:
      return { loading: false, loggedIn: action.payload }

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    case USER_DETAILS_RESET:
      return {}

    default:
      return state
  }
}

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }

    case USER_UPDATE_SUCCESS:
      return { loading: false, updatedInfo: action.payload }

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case USER_UPDATE_RESET:
      return {}

    default:
      return state
  }
}
