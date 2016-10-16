/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const GET_STATS = 'GET_STATS';
export const SET_DISPLAY_TORRENTS = 'SET_DISPLAY_TORRENTS';

export function pingTransmission() {
  return(dispatch, getState) => {
    console.log("Dispatching ping...");
    getState().transmission.api.getSessionId()
      .then((response) => {
          console.log("Ping response:");
          console.log(response);
          if (response.ok === false && response.status === 409) {
            console.log("Setting session id: " + response.headers.map['x-transmission-session-id']);
            getState().transmission.api.setSessionId(response.headers.map['x-transmission-session-id'][0]);
          }
          else
            throw new Error("Failed to ping");
        })
      .catch((error) => {
        console.log("Error pinging");
        console.log(error);
        console.warn(error);
      })
      .done(() => console.log(getState().transmission.api.sessionId));
  };
}

export function getStats() {
  return(dispatch, getState) => {
    console.log("transmission state object:");
    console.log(getState());
    console.log("Torrent stats: ");
    getState().transmission.api.getTransmissionStats()
      .then((response) => {
        console.log("Transmission response");
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.warn(error);
      })
      .done((responseJson) => {
        data = responseJson;
        console.log("Response data:");
        console.log(data);
      });
  };
}

export function setLocalUrl(url) {
  return(dispatch, getState) => {
    console.log("Setting Tranmission Local URL:");
    console.log(url);

    getState().transmission.api.setLocalUrl(url);
    offline.save("transmission:localUrl", url);
  };
}

export function setLocalPort(port) {
  return(dispatch, getState) => {
    console.log("Setting Tranmission Local Port:");
    console.log(port);

    getState().transmission.api.setLocalPort(port);
    offline.save("transmission:localPort", port);
  };
}

export function getTorrentInfo(ids) {
  return(dispatch, getState) => {
    console.log("Getting torrent info...");
    console.log(ids);
    getState().transmission.api.getTorrentInfo(ids)
      .then((response) => {
        console.log("getTorrentInfo response");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("getTorrentInfo data:");
        console.log(data);
        if (data.result == "success") {
          dispatch({
            type: SET_DISPLAY_TORRENTS,
            payload: {
              displayTorrents: data.arguments.torrents
            }
          });
        }
        else {
          console.log("Error getting torrent data.");
        }
      });
  }
}
