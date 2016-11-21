import { combineReducers } from 'redux';
import whatcd from './whatcd';
import transmission from './transmission';
import sickrage from './sickrage'

export default combineReducers({
  whatcd,
  transmission,
  sickrage
});
