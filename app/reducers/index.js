/*jshint esversion: 6 */

import { combineReducers } from 'redux';
import whatcd from './whatcd';
import movie from './movie';
import transmission from './transmission';

export default combineReducers({
  whatcd,
  movie,
  transmission
});
