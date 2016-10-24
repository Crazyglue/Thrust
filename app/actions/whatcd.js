import offline from 'react-native-simple-store';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_WHATCD_SEARCH_RESULT = 'SET_WHATCD_SEARCH_RESULT';
export const SET_WHATCD_SEARCH_PENDING = 'SET_WHATCD_SEARCH_PENDING';
import GET_STATS from './transmission';

export function setUsername(username) {
  console.log("Setting username: " + username);
  return(dispatch, getState) => {
    getState().whatcd.api.setUsername(username);
    offline.save("whatcd:username", username);
  };
}

export function setPassword(password) {
  console.log("Setting password: " + password);
  return(dispatch, getState) => {
    getState().whatcd.api.setPassword(password);
    offline.save("whatcd:password", password);
  };
}

export function getTorrent(searchText, options) {
  return(dispatch, getState) => {
    dispatch({
      type: SET_WHATCD_SEARCH_PENDING,
      payload: {
        whatcdSearchPending: true
      }
    });

    getState().whatcd.api.searchTorrent(searchText, options)
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
        dispatch({
          type: SET_WHATCD_SEARCH_PENDING,
          payload: {
            whatcdSearchPending: false
          }
        });
        return data;
      });
  };
}

export function downloadTorrent(torrentResult) {
  return (dispatch, getState) => {
    id = torrentResult;
    authkey = getState().whatcd.userData.authkey;
    passkey = getState().whatcd.userData.passkey;
    url = getState().whatcd.api.getDownloadUrl(id, authkey, passkey);
    console.log("downloadTorrent URL");
    console.log(url);
    getState().transmission.api.addTorrent(url)
      .then((response) => {
        console.log("Response:");
        console.log(response);
      })
      .catch((error) => {
        console.log("Error adding torrent");
        console.log(error);
        console.warn(error);
      })
      .done(() => console.log(""));
  };
}

export function login() {
  console.log("Logging into WhatCD");

  return(dispatch, getState) => {
    dispatch({
      type: SET_LOGIN_PENDING,
      payload: { isLoggingIn: true }
    });

    getState().whatcd.api.login()
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

          getState().whatcd.api.getIndex()
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
          console.log("WhatCD login unsuccessful, returned url: (" + response.url + ")");
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

export function loadOfflineCredentials() {
  console.log("Loading offline credentials...");
  return (dispatch, getState) => {
    return Promise.all([
      offline.get('whatcd:username').then(username => {
        getState().whatcd.api.setUsername(username || "");
      }),
      offline.get('whatcd:password').then(password => {
        getState().whatcd.api.setPassword(password || "");
      }),
      offline.get('transmission:localUrl').then(url => {
        getState().transmission.api.setLocalUrl(url || "");
      }),
      offline.get('transmission:localPort').then(port => {
        getState().transmission.api.setLocalPort(port || "");
      }),
      offline.get('transmission:downloadDir').then(dir => {
        getState().transmission.api.setDownloadDir(dir || "");
      })
    ]).then(() => {
      console.log("Credentials set");
    });
  };
}
