/*jshint esversion: 6 */

import {
  SEARCH_MOVIE,
  SET_RECENT_RESULT,
  SET_SEARCH_STATUS
} from '../actions/movie';
import TheMovieDBRequest from '../api/the_movie_db_request';

const initialState = {
  recentResult: {},
  lastSearchResult: '',
  isSearching: false,
  movieDB: new TheMovieDBRequest()
};

export default function reducer(state = initialState, action) {
  let recentResult;
  let lastSearchResult;
  let isSearching;

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

    case SET_SEARCH_STATUS:
      return {
        ...state,
        isSearching: action.payload.isSearching
      }

    default:
      return state
  }
}