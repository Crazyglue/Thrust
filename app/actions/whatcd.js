/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setUsername(username) {
  console.log("Setting username: " + username);
  return {
    type: SET_USERNAME,
    payload: { username: username }
  };
}

export function setPassword(password) {
  console.log("Setting password: " + password);
  return {
    type: SET_PASSWORD,
    payload: { password: password }
  };
}

export function loadOfflineCredentials() {
  console.log("Loading offline credentials...");
  return dispatch => {
    offline.get('username').then(username => {
      dispatch(setUsername(username || ""));
    });
    offline.get('password').then(password => {
      dispatch(setPassword(password || ""));
    });
  };
}

export function login() {
  console.log("Logging into WhatCD");

  return(dispatch, getState) => {
    getState().whatcd.whatcd.login()
      .then((response) => {
        console.log("WhatCD Login response:");
        console.log(response);
        if (response.url === "https://what.cd/index.php")
          console.log("WhatCD login successful!");
          dispatch({
            type: SET_LOGGED_IN,
            payload: {isLoggedIn: true}
          });

          getState().whatcd.whatcd.getIndex()
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              dispatch({
                type: SET_USER_DATA,
                payload: { userData: data.response }
              });
            })
            .done();

      })
      .catch((error) => {
        console.log("WhatCD login unsuccessful");
        console.warn(error);
        dispatch({
          type: SET_LOGGED_IN,
          payload: {isLoggedIn: false}
        });
      })
      .done();
    };
}

function offlineUsernameLoaded(username) {
  return {
    type: OFFLINE_USERNAME_LOADED,
    username: username
  };
}

function offlinePasswordLoaded(password) {
  return {
    type: OFFLINE_PASSWORD_LOADED,
    password: password
  };
}