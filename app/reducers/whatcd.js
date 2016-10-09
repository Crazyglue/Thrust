/*jshint esversion: 6 */

import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_USER_DATA,
  SET_LOGGED_IN,
  OFFLINE_USERNAME_LOADED,
  OFFLINE_PASSWORD_LOADED,
  SET_LOGIN_PENDING,
} from '../actions/whatcd';
import WhatCDRequest from '../api/whatcd_request';

const initialState = {
  username: "Bill",
  password: "Nye",
  userData: {},
  isLoggedIn: false,
  isLoggingIn: false,
  whatcd: new WhatCDRequest()
};

export default function reducer(state = initialState, action) {
  let username;
  let password;
  let userData;
  let isLoggedIn;
  let isLoggingIn;

  console.log("Dispatching action:");
  console.log(action);
  switch (action.type) {

    case SET_USERNAME:
      console.log("Inside username reducer...");
      return {
        ...state,
        username: action.payload.username
      }

    case SET_PASSWORD:
      console.log("Inside password reducer...");
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