

import {
  GET_STATS,
  SET_DISPLAY_TORRENTS,
} from '../actions/transmission';
import TransmissionAPI from '../api/transmission';

const initialState = {
  api: new TransmissionAPI(),
  displayTorrents: [],
};

export default function reducer(state = initialState, action) {
  let api;
  let displayTorrents;

  console.log(action);
  switch (action.type) {

    case GET_STATS:
      return {
        ...state,
        username: action.payload.username
      }

    case SET_DISPLAY_TORRENTS:
      return {
        ...state,
        displayTorrents: action.payload.displayTorrents
      }

    default:
      return state
  }
}
