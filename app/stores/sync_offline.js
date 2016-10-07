/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating store...");
  let syncedUsername;
  let syncedPassword;

  let recentResult;

  store.subscribe(() => {
    const state = store.getState();
    console.log("Syncing offline...");

    console.log("Syncing username: " + state.login.username);
    console.log(state.login.username);

    console.log("Syncing password: " + state.login.password);
    console.log(state.login.password);

    offline.save("username", state.login.username);
    offline.save("password", state.login.password);

    if(state.movie.recentResult != recentResult) {
      console.log("Syncing recent result:");
      console.log(state.movie.recentResult);
      recentResult = state.movie.recentResult;
      offline.save('recent_result', recentResult);
    }
  });
}
