/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating syncOffline store...");
  let syncedUsername;
  let syncedPassword;

  let recentResult;

  store.subscribe(() => {
    const state = store.getState();
    console.log("updating!");

    if(state.whatcd.api.password != syncedPassword || state.whatcd.api.username != syncedUsername || state.movie.recentResult != recentResult)
      console.log("Syncing offline...");
      console.log(state);

    if(state.whatcd.api.username != syncedUsername) {
      console.log("Saving username: " + state.whatcd.api.username);
      console.log(state.whatcd.api.username);
      syncedUsername = state.whatcd.api.username;
      offline.save("whatcd:username", state.whatcd.api.username);
    }

    if(state.whatcd.api.password != syncedPassword) {
      console.log("Saving password: " + state.whatcd.api.password);
      console.log(state.whatcd.api.password);
      syncedPassword = state.whatcd.api.password;
      offline.save("whatcd:password", state.whatcd.api.password);
    }

    if(state.movie.recentResult != recentResult) {
      console.log("Saving recent result:");
      console.log(state.movie.recentResult);
      recentResult = state.movie.recentResult;
      offline.save('recent_result', state.movie.recentResult);
    }
  });
}
