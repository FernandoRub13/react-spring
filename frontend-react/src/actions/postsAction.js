import axios from "axios";
import { SET_USER_POSTS } from "./types";
import { USERS_POSTS_ENDPOINT } from "../helpers/endpoints";

export const getUserPosts = () => dispatch =>{
  return new Promise((resolve, reject) =>{
    axios.get(USERS_POSTS_ENDPOINT, {
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'}
    }).then(response =>{
      
      dispatch(({type: SET_USER_POSTS, payload: {fetched: true, posts: response.data}}))
      
      resolve(response)
    }).catch(error =>{
      reject(error);
    })
  })
}