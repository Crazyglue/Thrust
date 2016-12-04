import offline from 'react-native-simple-store';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export const SET_SHOWS = 'SET_SHOWS';
export const SET_SEASONS = 'SET_SEASONS';
export const UPDATE_SHOWS = 'UPDATE_SHOWS';
export const SET_IS_GETTING_SHOWS = 'SET_IS_GETTING_SHOWS';
export const SET_LAST_UPDATE = 'SET_LAST_UPDATE';

export function getShows() {
  return (dispatch, getState) => {
    dispatch({
      type: SET_IS_GETTING_SHOWS,
      payload: {
        isGettingShows: true
      }
    })

    getState().sickrage.api.getShows()
      .then((response) => {
        // console.log("Sickrage repsonse: ", response);
        if (response.status == 200 && response.ok == true)
          return response.json();
        else
          console.warn("BAD RESPONSE:", response);
      })
      .then((json) => {
        console.log("Sickrage data: ", json);
        if (json.result == "success") {
          // console.log("data:", json.data);

          let showIds = []

          // Change mapping from "Show name": { object }
          // to "indexerid": { object }
          mappedKeys = _.mapKeys(json.data, (key, value, object) => {
            showIds.push(key.indexerid);
            return key.indexerid;
          })
          // console.log("Mapping Keys:", mappedKeys);
          dispatch({
            type: SET_SHOWS,
            payload: {
              shows: mappedKeys
            }
          });
          return showIds;
        }
        else
          console.warn("Bad response, json.result != success", json);
      })
      .then(showIds => {
        let updates = {};
        _.map(showIds, id => {
          updates[id] = {}
        })

        Promise.all([
          // get show banners
          Promise.all(_.map(showIds, id => {
            return getState().sickrage.api.getShowBanner(id)
              .then(response => {
                return response.data
              })
              .then(image => {
                updates[id].image = image
              })
          })),

          // get show seasons
          Promise.all(_.map(showIds, id => {
            return getState().sickrage.api.getSeasons(id)
              .then(response => {
                // console.log("seasonData:", response);
                if (response.ok == true && response.status == 200)
                  return response.json()
                else
                  console.warn("BAD RESPONSE", response);
              })
              .then(seasons => {
                updates[id].seasons = seasons.data
              })
          })),

          // get show posters
          Promise.all(_.map(showIds, id => {
            return getState().sickrage.api.getPoster(id)
              .then(response => {
                // console.log("posterData:", response);
                return response.path()
              })
              .then(image => {
                updates[id].poster = image
              })
          }))

        ])
        .then(() => {
          dispatch({
            type: UPDATE_SHOWS,
            payload: {
              shows: updates
            }
          })
        })
        .done(() => {
          console.log("offline saving shows:", getState().sickrage.shows);
          offline.save("sickrage:shows", getState().sickrage.shows);
          console.log("moment:", moment().format());
          dispatch({
            type: SET_IS_GETTING_SHOWS,
            payload: {
              isGettingShows: false,
            }
          })
          dispatch({
            type: SET_LAST_UPDATE,
            payload: {
              lastUpdate: moment()
            }
          })
        })
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

export function addNewShow(params) {
  return(dispatch, getState) => {
    console.log("params", querystring.stringify(params));
    getState().sickrage.api.addNewShow(querystring.stringify(params))
      .then(response => {
        console.log("addNewShow response:", response);
        if (response.ok && response.status == 200) {
          return response.json()
        }
        else
          console.warn("Error sending new show to sickrage:", response)
      })
      .then(json => {
        console.log("returned json", json)
        if (json.result == "success") {
          console.log("MessageBarManager:", MessageBarManager);
          console.log("MessageBarAlert:", MessageBarAlert);
          MessageBarManager.showAlert({
            title: 'Your alert title goes here',
            message: 'Your alert message goes here',
            alertType: 'success',
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
          });
          return json.message
        }
        else
          return console.warn("Error adding show", json)
      })
  }
}
