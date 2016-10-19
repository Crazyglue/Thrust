

import offline from 'react-native-simple-store';

export const GET_STATS = 'GET_STATS';
export const SET_DISPLAY_TORRENTS = 'SET_DISPLAY_TORRENTS';

export function pingTransmission() {
  return(dispatch, getState) => {
    console.log("Dispatching ping...");
    getState().transmission.api.getSessionId()
      .then((response) => {
          if (response.ok === false && response.status === 409) {
            console.log("Setting session id: " + response.headers.map['x-transmission-session-id']);
            getState().transmission.api.setSessionId(response.headers.map['x-transmission-session-id'][0]);
          }
          else
            throw new Error("Failed to ping. Check URL, port, and transmission availability");
        })
      .catch((error) => {
        console.log("Error pinging");
        console.log(error);
        console.warn(error);
      })
  };
}

export function getStats() {
  return(dispatch, getState) => {
    console.log("Getting transmission stats");
    getState().transmission.api.getTransmissionStats()
      .then((response) => {
        console.log("Transmission getStats response");
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.warn(error);
      })
      .done((responseJson) => {
        data = responseJson;
        console.log("Transmission getStats data:");
        console.log(data);
      });
  };
}

export function setLocalUrl(url) {
  return(dispatch, getState) => {
    console.log("Setting Tranmission Local URL: " + url);

    getState().transmission.api.setLocalUrl(url);
    offline.save("transmission:localUrl", url);
  };
}

export function setLocalPort(port) {
  return(dispatch, getState) => {
    console.log("Setting Tranmission Local Port: " + port);

    getState().transmission.api.setLocalPort(port);
    offline.save("transmission:localPort", port);
  };
}

export function getTorrentInfo(ids = []) {
  return(dispatch, getState) => {
    console.log("Getting torrent info with the following IDs: " + ids);
    getState().transmission.api.getTorrentInfo(ids)
      .catch((error) => {
        console.log("Error on gettorrentInfo:");
        console.log(error);
        console.warn(error);
      })
      .then((response) => {
        console.log("getTorrentInfo response.ok: " + response.ok);
        return response.json();
      })
      .then((data) => {
        if (data.result == "success") {
          console.log("getTorrentInfo data:");
          console.log(data.arguments);
          dispatch({
            type: SET_DISPLAY_TORRENTS,
            payload: {
              displayTorrents: data.arguments.torrents
            }
          });
        }
        else {
          console.log("Error getting torrent data.");
          console.log(data);
        }
      });
  }
}
