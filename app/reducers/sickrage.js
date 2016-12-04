import {
  SET_SHOWS,
  SET_SEASONS,
  UPDATE_SHOWS,
  SET_IS_GETTING_SHOWS,
  SET_LAST_UPDATE,
} from '../actions/sickrage';
import SickRage from '../api/sickrage';

import _ from 'lodash';

const initialState = {
  shows: [],
  api: new SickRage(),
  isGettingShows: false,
  lastUpdate: ""
};

export default function reducer(state = initialState, action) {
  // console.log("Dispatching action:");
  // console.log(action);
  switch (action.type) {

    case SET_SHOWS:
      return {
        ...state,
        shows: action.payload.shows
      }


    case UPDATE_SHOWS:
      return {
        ...state,
        shows: _.merge({}, state.shows, action.payload.shows)
      }

    case SET_IS_GETTING_SHOWS:
      return {
        ...state,
        isGettingShows: action.payload.isGettingShows
      }

    case SET_LAST_UPDATE:
      return {
        ...state,
        lastUpdate: action.payload.lastUpdate
      }

    default:
      return state
  }
}