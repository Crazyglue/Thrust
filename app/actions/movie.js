/*jshint esversion: 6 */

import offline from 'react-native-simple-store';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SET_RECENT_RESULT = 'SET_RECENT_RESULT';

export function searchMovie(movie) {
  console.log("Searching movie: " + movie);
  return {
    type: SEARCH_MOVIE,
    movie: movie
  };
}

export function setRecentResult(result) {
  console.log("Setting recent result: " + result);
  return {
    type: SET_RECENT_RESULT,
    result: result
  };
}