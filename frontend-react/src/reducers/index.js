import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userPostsReducer from './userPostsReducer';

export default combineReducers({
  auth: authReducer,
  posts: userPostsReducer
})