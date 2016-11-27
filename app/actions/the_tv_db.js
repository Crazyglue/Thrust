import _ from 'lodash';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export function login() {
  return (dispatch, getState) => {
    console.log("state:", getState());
    getState().the_tv_db.api.login()
  };
}

export function searchSeries(string) {
  console.log("Searching string...", string);
  return (dispatch, getState) => {
    // console.log("state:", getState());
    getState().the_tv_db.api.searchSeries(string)
      .then(response => {
        console.log("Response", response);
        return response.json()
      })
      .then(json => {
        console.log("Json", json.data);
        results = _.sortBy(_.filter(json.data, (o) => o.seriesName != "** 403: Series Not Permitted **"), 'id')
        dispatch({
          type: SET_SEARCH_RESULTS,
          payload: {
            results: results
          }
        })
      })
  };
}
