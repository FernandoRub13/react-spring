import { SET_USER_POSTS } from '../actions/types'

const initialState = { posts: [], fetched: false }

const userPostReducers = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER_POSTS:
      return {
        ...state,
        fetched: payload.fetched,
        posts: payload.posts,
      }

    default:
      return state
  }
}

export default userPostReducers
