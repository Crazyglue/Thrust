import offline from 'react-native-simple-store';
import { SET_USERNAME, SET_PASSWORD } from './whatcd';
import login from './whatcd';

export function loadOfflineCredentials() {
  console.log("Loading offline credentials...");
  return (dispatch, getState) => {
    state = getState()
    return Promise.all([
      offline.get('sickrage:url').then(url => {
        state.sickrage.api.setUrl(url || "");
      }),
      offline.get('sickrage:apiKey').then(key => {
        console.log("Getting apikey", key);
        state.sickrage.api.setApiKey(key || "");
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
      })
    ]).then(() => {
      console.log("Credentials set");
    });
  };
}
