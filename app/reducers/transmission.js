import {
  GET_STATS,
  SET_DISPLAY_TORRENTS,
  SET_SESSION_STATS
} from '../actions/transmission';
import TransmissionAPI from '../api/transmission';

const initialState = {
  api: new TransmissionAPI(),
  displayTorrents: [],
  sessionStats: []
};

export default function reducer(state = initialState, action) {
  let api;
  let displayTorrents;

  // console.log(action);
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

    case SET_SESSION_STATS:
      return {
        ...state,
        sessionStats: action.payload.sessionStats
      }

    default:
      return state
  }
}
