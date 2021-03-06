import offline from 'react-native-simple-store';
import { SET_USERNAME, SET_PASSWORD } from './whatcd';
import { SET_LAST_UPDATE, SET_SHOWS } from './sickrage';
import { SET_TRANSMISSION_USERNAME, SET_TRANSMISSION_PASSWORD } from './transmission';
import login from './whatcd';
import moment from 'moment';

export function loadOfflineCredentials() {
  console.log("Loading offline credentials...");
  return (dispatch, getState) => {
    state = getState()
    return Promise.all([
      offline.get('sickrage:url').then(url => {
        console.log("Getting url", url);
        state.sickrage.api.setUrl(url || "192.168.1.155:8081");
      }),
      offline.get('sickrage:apiKey').then(key => {
        console.log("Getting apikey", key);
        state.sickrage.api.setApiKey(key || "6c80a6496ea33840bd8d21284da277f3");
      }),

      offline.get('sickrage:lastUpdate').then(lastUpdate => {
        console.log("Getting lastUpdate", lastUpdate);
        dispatch({
          type: SET_LAST_UPDATE,
          payload: {
            lastUpdate: lastUpdate || moment().subtract(3, 'years')
          }
        })
      }),

      offline.get('sickrage:shows').then(shows => {
        console.log("Getting shows", shows);
        dispatch({
          type: SET_SHOWS,
          payload: {
            shows: shows || {}
          }
        })
      }),

      offline.get('transmission:localUrl').then(url => {
        state.transmission.api.setLocalUrl(url || "192.168.1.160");
      }),
      offline.get('transmission:localPort').then(port => {
        state.transmission.api.setLocalPort(port || "9091");
      }),
      offline.get('transmission:downloadDir').then(dir => {
        state.transmission.api.setDownloadDir(dir || "");
      }),
      offline.get('transmission:startPaused').then(paused => {
        state.transmission.api.setStartPaused(paused || true);
      }),
      offline.get('transmission:username').then(username => {
        dispatch({
          type: SET_TRANSMISSION_USERNAME,
          payload: {
            username: username || ""
          }
        })
      }),
      offline.get('transmission:password').then(password => {
        dispatch({
          type: SET_TRANSMISSION_PASSWORD,
          payload: {
            password: password || ""
          }
        })
      })
    ]).then(() => {
      console.log("Credentials set");
    });
  };
}
