import offline from 'react-native-simple-store';

export default function(store) {
  console.log("Creating syncOffline store...");
  let syncedUsername;
  let syncedPassword;
  let sickrageUrl;
  let sickrageApiKey;

  store.subscribe(() => {
    console.log("updating!");

    const state = store.getState();
    
  });
}
