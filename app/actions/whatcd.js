/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_WHATCD_SEARCH_RESULT = 'SET_WHATCD_SEARCH_RESULT';
import GET_STATS from './transmission';

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

export function getTorrent(searchText) {
  return(dispatch, getState) => {
    getState().whatcd.whatcd.getTorrent(searchText)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.status === "success") {
          console.log("WhatCD getTorrent result:");
          console.log(data.response);

          dispatch({
            type: SET_WHATCD_SEARCH_RESULT,
            payload: {
              result: data.response
            }
          });
        }
      })
      .done((data) => {
        return data;
      });
  };
}

export function downloadTorrent(torrentResult) {
  return (dispatch, getState) => {
    id = torrentResult;
    authkey = getState().whatcd.userData.authkey;
    passkey = getState().whatcd.userData.passkey;
    url = getState().whatcd.whatcd.getDownloadUrl(id, authkey, passkey);
    console.log("downloadTorrent URL");
    console.log(url);
    getState().transmission.api.addTorrent(url)
      .then((response) => {
        console.log("Response:");
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      })
      .done(() => console.log("DONE!"));
  };
}

export function login() {
  console.log("Logging into WhatCD");

  return(dispatch, getState) => {
    dispatch({
      type: SET_LOGIN_PENDING,
      payload: { isLoggingIn: true }
    });

    getState().whatcd.whatcd.login()
      .then((response) => {
        console.log("WhatCD Login response:");
        console.log(response);
        if (response.url === "https://what.cd/index.php") {
          console.log("WhatCD login successful!");
          dispatch({
            type: SET_LOGGED_IN,
            payload: {isLoggedIn: true}
          });
          dispatch({
            type: SET_LOGIN_PENDING,
            payload: { isLoggingIn: false }
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
        }
        else {
          dispatch({
            type: SET_LOGGED_IN,
            payload: {isLoggedIn: false}
          });
          dispatch({
            type: SET_LOGIN_PENDING,
            payload: { isLoggingIn: false }
          });
        }

      })
      .catch((error) => {
        console.log("WhatCD login unsuccessful");
        console.warn(error);
        dispatch({
          type: SET_LOGGED_IN,
          payload: {isLoggedIn: false}
        });
        dispatch({
          type: SET_LOGIN_PENDING,
          payload: { isLoggingIn: false }
        });
      })
      .done();
    };
}
