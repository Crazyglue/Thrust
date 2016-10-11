/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const GET_STATS = 'GET_STATS';

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
