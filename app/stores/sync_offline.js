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

    if (state.sickrage.api.getUrl() != sickrageUrl) {
      sickrageUrl = state.sickrage.api.baseUrl
      offline.save("sickrage:url", sickrageUrl);
      console.log("Saved sickrage url:", sickrageUrl);
    }

    if (state.sickrage.api.getApiKey() != sickrageApiKey) {
      sickrageApiKey = state.sickrage.api.apiKey
      offline.save("sickrage:apiKey", sickrageApiKey);
      console.log("Saved sickrage api key:", sickrageApiKey);
    }
  });
}
