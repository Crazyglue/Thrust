/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const OFFLINE_USERNAME_LOADED = 'OFFLINE_USERNAME_LOADED';
export const OFFLINE_PASSWORD_LOADED = 'OFFLINE_PASSWORD_LOADED';


export function setUsername(username) {
  console.log("Setting username: " + username);
  return {
    type: SET_USERNAME,
    username: username
  };
}

export function setPassword(password) {
  console.log("Setting password: " + password);
  return {
    type: SET_PASSWORD,
    password: password
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