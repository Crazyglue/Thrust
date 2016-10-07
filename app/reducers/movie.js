/*jshint esversion: 6 */

import {
  SEARCH_MOVIE,
  SET_RECENT_RESULT
} from '../actions/movie';
import TheMovieDBRequest from '../utils/the_movie_db_request';

const initialState = {
  recentResult: {},
  lastMovieSearch: '',
  movieDB: new TheMovieDBRequest()
};

export default function reducer(state = initialState, action) {
  let recentResult;
  let lastMovieSearch;

  console.log(action);
  switch (action.type) {

    case SEARCH_MOVIE:
      searchString = action.movie;

      state.movieDB.search(searchString);
      return {
        ...state,
        lastMovieSearch: searchString
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