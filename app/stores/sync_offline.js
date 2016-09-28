/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  let username;
  let password;

  store.subscribe(() => {
    const state = store.getState();
    const offlineUsernameLoaded = state.offlineUsernameLoaded;
    const offlinePasswordLoaded = state.offlineUsernameLoaded;
    const offlineUsername = state.username;
    const offlinePassword = state.password;

    if (offlineUsernameLoaded && username != offlineUsername) {
      console.log("LOADING OFFLINE USERNAME: ");
      console.log(offlineUsername);
      offline.save('username', offlineUsername);
      username = offlineUsername;
    }

    if (offlinePasswordLoaded && password != offlinePassword) {
      console.log("LOADING OFFLINE PASSWORD: ");
      console.log(offlinePassword);
      offline.save('password', offlinePassword);
      password = offlinePassword;
    }
  });
}
