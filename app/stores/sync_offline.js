/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating syncOffline store...");
  let syncedUsername;
  let syncedPassword;

  let recentResult;

  store.subscribe(() => {
    const state = store.getState();
    if(state.whatcd.password || state.whatcd.username || state.movie.recentResult != recentResult)
      console.log("Syncing offline...");

    if(state.whatcd.username) {
      console.log("Syncing username: " + state.whatcd.username);
      console.log(state.whatcd.username);
      offline.save("username", state.whatcd.username);
    }

    if(state.whatcd.password) {
      console.log("Syncing password: " + state.whatcd.password);
      console.log(state.whatcd.password);
      offline.save("password", state.whatcd.password);
    }


    if(state.movie.recentResult != recentResult) {
      console.log("Syncing recent result:");
      console.log(state.movie.recentResult);
      recentResult = state.movie.recentResult;
      offline.save('recent_result', recentResult);
    }
  });
}
