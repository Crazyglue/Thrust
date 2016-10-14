/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const GET_STATS = 'GET_STATS';

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
