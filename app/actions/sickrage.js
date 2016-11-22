import offline from 'react-native-simple-store';
import _ from 'lodash';

export const SET_SHOWS = 'SET_SHOWS';

export function getShows() {
  return(dispatch, getState) => {

    getState().sickrage.api.getShows()
      .then((response) => {
        console.log("Sickrage repsonse: ", response);
        if (response.status == 200 && response.ok == true)
          return response.json();
        else
          console.warn("BAD RESPONSE:", response);
      })
      .then((json) => {
        console.log("Sickrage data: ", json);
        if (json.result == "success") {

          shows = _.flatMap(json.data)
          console.log("shows", shows);
          showIds = _.map(shows, 'indexerid');
          console.log("showIds", showIds);
          let banners = [];

          Promise.all(_.map(showIds, id => getState().sickrage.api.getShowBanner(id)))
            .then(responses => {
              Promise.all(_.map(responses, response => response.path()))
                .then(images => {
                  console.log("images", images);
                  showIds.forEach(id => {
                    index = _.findIndex(shows, function(o) { return o.indexerid == id; });
                    shows[index].image = images[index];
                  })
                  return shows;
                })
                .then((shows) => {
                  console.log("shows", shows);
                  dispatch({
                    type: SET_SHOWS,
                    payload: {
                      shows: shows
                    }
                  });
                });
            })
        }
        else
          console.warn("Bad response, json.result != success");
      })
  };
}

export function setSickrageUrl(url) {
  return(dispatch, getState) => {
    offline.save("sickrage:url", url);
    getState().sickrage.api.setUrl(url);
  }
}

export function setSickrageApiKey(key) {
  return(dispatch, getState) => {
    offline.save("sickrage:apiKey", key);
    getState().sickrage.api.setUrl(key);
  }
}
