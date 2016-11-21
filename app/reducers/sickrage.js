import {
  SET_SHOWS
} from '../actions/sickrage';
import SickRage from '../api/sickrage';

import _ from 'lodash';

const initialState = {
  shows: [],
  api: new SickRage('192.168.1.155:8081', '6c80a6496ea33840bd8d21284da277f3'),
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

    default:
      return state
  }
}