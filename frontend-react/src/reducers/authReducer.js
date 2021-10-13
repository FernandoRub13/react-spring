import { SET_CURRENT_USER } from '../actions/types'

const initialState = { loggedIn: false, user: {} }

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loggedIn: payload.loggedIn,
        user: payload.user,
      }

    default:
      return state
  }
}

export default authReducer
