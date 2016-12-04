import { SET_SEARCH_RESULTS } from '../actions/the_tv_db';
import TheTvDb from '../api/the_tv_db';

import _ from 'lodash';

const initialState = {
  api: new TheTvDb(),
  searchResult: []
};

export default function reducer(state = initialState, action) {
  // console.log("Dispatching action:");
  // console.log(action);
  switch (action.type) {

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResult: action.payload.results
      }

    default:
      return state
  }
}
