import { combineReducers } from 'redux';
import whatcd from './whatcd';
import transmission from './transmission';
import sickrage from './sickrage'
import routes from './routes';

export default combineReducers({
  whatcd,
  transmission,
  sickrage,
  routes
});
