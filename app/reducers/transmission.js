import {
  GET_STATS,
  SET_DISPLAY_TORRENTS,
  SET_SESSION_STATS,
  SET_STATUS_FILTER,
  SET_TRANSMISSION_USERNAME,
  SET_TRANSMISSION_PASSWORD
} from '../actions/transmission';
import TransmissionAPI from '../api/transmission';

const initialState = {
  api: new TransmissionAPI(),
  displayTorrents: [],
  sessionStats: [],
  statusFilter: 0
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

    case SET_STATUS_FILTER:
      return {
        ...state,
        statusFilter: action.payload.statusFilter
      }

    case SET_TRANSMISSION_USERNAME:
      newApi = Object.assign(new TransmissionAPI(), state.api, { username: action.payload.username })
      return {
        ...state,
        api: newApi
      }

    case SET_TRANSMISSION_PASSWORD:
      newApi = Object.assign(new TransmissionAPI(), state.api, { password: action.payload.password })
      return {
        ...state,
        api: newApi
      }

    default:
      return state
  }
}
