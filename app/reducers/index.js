import { combineReducers } from 'redux';
import whatcd from './whatcd';
import transmission from './transmission';

export default combineReducers({
  whatcd,
  transmission
});
