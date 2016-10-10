/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating syncOffline store...");
  let syncedUsername;
  let syncedPassword;

  let recentResult;

  store.subscribe(() => {
    const state = store.getState();
    if(state.whatcd.password != syncedPassword || state.whatcd.username != syncedUsername || state.movie.recentResult != recentResult)
      console.log("Syncing offline...");
      console.log(state);

    if(state.whatcd.username != syncedUsername) {
      console.log("Saving username: " + state.whatcd.username);
      console.log(state.whatcd.username);
      syncedUsername = state.whatcd.username;
      offline.save("username", state.whatcd.username);
    }

    if(state.whatcd.password != syncedPassword) {
      console.log("Saving password: " + state.whatcd.password);
      console.log(state.whatcd.password);
      syncedPassword = state.whatcd.password;
      offline.save("password", state.whatcd.password);
    }


    if(state.movie.recentResult != recentResult) {
      console.log("Saving recent result:");
      console.log(state.movie.recentResult);
      recentResult = state.movie.recentResult;
      offline.save('recent_result', state.movie.recentResult);
    }
  });
}
