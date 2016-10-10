/*jshint esversion: 6 */

import {
  GET_STATS,
} from '../actions/transmission';
import TransmissionAPI from '../api/transmission';

const initialState = {
  api: new TransmissionAPI()
};

export default function reducer(state = initialState, action) {
  let api;

  console.log(action);
  switch (action.type) {

    case GET_STATS:
      return {
        ...state,
        username: action.payload.username
      }

    default:
      return state
  }
}
