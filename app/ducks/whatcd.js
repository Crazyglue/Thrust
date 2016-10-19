const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_WHATCD_SEARCH_RESULT = 'SET_WHATCD_SEARCH_RESULT';
const SET_WHATCD_SEARCH_PENDING = 'SET_WHATCD_SEARCH_PENDING';
import GET_STATS from './transmission';

const initialState = {
  username: "",
  password: "",
  userData: {},
  isLoggedIn: false,
  isLoggingIn: false,
  api: new WhatCDAPI(),
  searchResult: {},
  whatcdSearchPending: false
};

function reducer(state = initialState, action = {}) {
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

    case SET_WHATCD_SEARCH_PENDING:
      return {
        ...state,
        whatcdSearchPending: action.payload.whatcdSearchPending
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
    default: return state;
  }
}

reducer.setUsername = ((username) => {
  console.log("Setting username: " + username);
  return(dispatch, getState) => {
    getState().whatcd.api.setUsername(username);
    offline.save("whatcd:username", username);
  };
});

reducer.setPassword = ((password) => {
  console.log("Setting password: " + password);
  return(dispatch, getState) => {
    getState().whatcd.api.setPassword(password);
    offline.save("whatcd:password", password);
  };
});

reducer.getTorrent = ((searchText, options) => {
  return(dispatch, getState) => {
    dispatch({
      type: SET_WHATCD_SEARCH_PENDING,
      payload: {
        whatcdSearchPending: true
      }
    });

    getState().whatcd.api.getTorrent(searchText, options)
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
});

reducer.downloadTorrent = ((torrentResult) => {
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
});

reducer.login = (() =>  {
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
});

reducer.loadOfflineCredentials = (() => {
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
      })
    ]).then(() => {
      console.log("Credentials set");
    });
  };
});

module.exports = reducer;