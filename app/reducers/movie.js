/*jshint esversion: 6 */

import {
  SEARCH_MOVIE,
  SET_RECENT_RESULT
} from '../actions/movie';
import TheMovieDBRequest from '../utils/the_movie_db_request';

const initialState = {
  recentResult: {},
  lastSearchResult: '',
  movieDB: new TheMovieDBRequest()
};

export default function reducer(state = initialState, action) {
  let recentResult;
  let lastSearchResult;

  console.log(action);
  switch (action.type) {

    case SEARCH_MOVIE:
      searchResult = action.payload.movie;
      return {
        ...state,
        lastSearchResult: searchResult
      }

    case SET_RECENT_RESULT:
      return {
        ...state,
        recentResult: action.result
      }

    default:
      return state
  }
}