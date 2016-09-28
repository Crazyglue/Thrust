/*jshint esversion: 6 */

import {
  SET_USERNAME,
  SET_PASSWORD,
  OFFLINE_USERNAME_LOADED,
  OFFLINE_PASSWORD_LOADED
} from '../actions/login';

const initialState = {
  username: "",
  password: ""
};

export default function reducer(state = initialState, action) {
  let username;
  let password;

  console.log(action);
  switch (action.type) {

    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case SET_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case OFFLINE_USERNAME_LOADED:
      return {
        ...state,
        username: action.username,
        offlineUsernameLoaded: true
      }

    case OFFLINE_PASSWORD_LOADED:
      return {
        ...state,
        password: action.password,
        offlinePasswordLoaded: true
      }

    default:
      return state
  }
}