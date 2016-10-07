/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SET_RECENT_RESULT = 'SET_RECENT_RESULT';

export function searchMovie(movie) {
  console.log("Searching movie: " + movie);
  return (dispatch, getState) => {
    console.log("searchMovie getState():");
    console.log(getState());
    console.log("searchMovie dispatch:");
    console.log(dispatch);

    getState().movie.movieDB.search(movie)
      .then((response) => {
        console.log("searchMovie.result:");
        console.log(response);

        return response.json()
      })
      .then((response) => {
        console.log("Response data:");
        console.log(response);
        dispatch({
          type: SEARCH_MOVIE,
          payload: {
            movie: response
          }
        });
      })
      .done(() => {
        console.log("Finished fetching movie!");
      });
  };
}

export function setRecentResult(result) {
  console.log("Setting recent result: " + result);
  return {
    type: SET_RECENT_RESULT,
    result: result
  };
}