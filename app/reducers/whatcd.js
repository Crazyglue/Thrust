/*jshint esversion: 6 */

import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_USER_DATA,
  SET_LOGGED_IN,
  OFFLINE_USERNAME_LOADED,
  OFFLINE_PASSWORD_LOADED,
  SET_LOGIN_PENDING,
  SET_WHATCD_SEARCH_RESULT,
} from '../actions/whatcd';
import WhatCDAPI from '../api/whatcd';

const initialState = {
  username: "",
  password: "",
  userData: {},
  isLoggedIn: false,
  isLoggingIn: false,
  whatcd: new WhatCDAPI(),
  searchResult: {}
};

export default function reducer(state = initialState, action) {
  let username;
  let password;
  let userData;
  let isLoggedIn;
  let isLoggingIn;
  let searchResult;

  console.log("Dispatching action:");
  console.log(action);
  switch (action.type) {

    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload.userData
      }

    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn
      }

    case SET_LOGIN_PENDING:
      return {
        ...state,
        isLoggingIn: action.payload.isLoggingIn
      }

    case SET_WHATCD_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload.result
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