import offline from 'react-native-simple-store';
import { SET_USERNAME, SET_PASSWORD } from './whatcd';
import login from './whatcd';

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
        getState().transmission.api.setLocalUrl(url || "192.168.1.160");
      }),
      offline.get('transmission:localPort').then(port => {
        getState().transmission.api.setLocalPort(port || "9091");
      }),
      offline.get('transmission:downloadDir').then(dir => {
        getState().transmission.api.setDownloadDir(dir || "");
      }),
      offline.get('transmission:startPaused').then(paused => {
        getState().transmission.api.setStartPaused(paused || true);
      })
    ]).then(() => {
      console.log("Credentials set");
    });
  };
}
