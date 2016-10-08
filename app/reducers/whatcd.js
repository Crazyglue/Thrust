/*jshint esversion: 6 */

import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_USER_DATA,
  SET_LOGGED_IN,
  OFFLINE_USERNAME_LOADED,
  OFFLINE_PASSWORD_LOADED,
} from '../actions/whatcd';
import WhatCDRequest from '../api/whatcd_request';

const initialState = {
  username: "",
  password: "",
  userData: {},
  isLoggedIn: false,
  whatcd: new WhatCDRequest()
};

export default function reducer(state = initialState, action) {
  let username;
  let password;
  let userData;
  let isLoggedIn;

  console.log("Dispatching action:");
  console.log(action);
  switch (action.type) {

    case SET_USERNAME:
      console.log("Inside username reducer...");
      return {
        ...state,
        username: action.username
      }

    case SET_PASSWORD:
      console.log("Inside password reducer...");
      return {
        ...state,
        password: action.password
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