/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating syncOffline store...");
  let syncedUsername;
  let syncedPassword;

  let recentResult;

  store.subscribe(() => {
    const state = store.getState();
    if(state.login.password || state.login.username || state.movie.recentResult != recentResult)
      console.log("Syncing offline...");

    if(state.login.username) {
      console.log("Syncing username: " + state.login.username);
      console.log(state.login.username);
      offline.save("username", state.login.username);
    }

    if(state.login.password) {
      console.log("Syncing password: " + state.login.password);
      console.log(state.login.password);
      offline.save("password", state.login.password);
    }


    if(state.movie.recentResult != recentResult) {
      console.log("Syncing recent result:");
      console.log(state.movie.recentResult);
      recentResult = state.movie.recentResult;
      offline.save('recent_result', recentResult);
    }
  });
}
