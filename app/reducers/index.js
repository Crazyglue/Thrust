import { combineReducers } from 'redux';
import whatcd from './whatcd';
import transmission from './transmission';
import sickrage from './sickrage'
import routes from './routes';
import the_tv_db from './the_tv_db';

export default combineReducers({
  whatcd,
  transmission,
  sickrage,
  routes,
  the_tv_db
});
