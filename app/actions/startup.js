/*jshint esversion: 6 */

import offline from 'react-native-simple-store';
import { SET_USERNAME, SET_PASSWORD } from './whatcd';

export function pingTransmission() {
  return(dispatch, getState) => {
    getState().transmission.api.getSessionId()
      .then((response) => {
          console.log("Ping response:");
          console.log(response);
          if (response.ok === false && response.status === 409) {
            console.log("Setting session id: " + response.headers.map['x-transmission-session-id']);
            getState().transmission.api.setSessionId(response.headers.map['x-transmission-session-id'][0]);
          }
        })
      .catch((error) => console.warn(error))
      .done(() => console.log(getState().transmission.api.sessionId));
  };
}

export function loadOfflineCredentials() {
  console.log("Loading offline credentials...");
  return (dispatch, getState) => {
    Promise.all([
      offline.get('username').then(username => {
        dispatch({
          type: SET_USERNAME,
          payload: {
            username: (username || "")
          }
        });
      }),
      offline.get('password').then(password => {
        dispatch({
          type: SET_PASSWORD,
          payload: {
            password: (password || "")
          }
        });
      })
    ]).then(() => {
      getState().whatcd.whatcd.login();
    });
  };
}
