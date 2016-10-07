/*jshint esversion: 6 */

import { combineReducers } from 'redux';
import login from './login';
import movie from './movie';

export default combineReducers({
  login,
  movie
});
