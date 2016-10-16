/*jshint esversion: 6 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import syncOffline from './sync_offline';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'remote-redux-devtools';

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools(/*options*/) :
      noop => noop
  );

  const store = createStore(
    reducer, {}, enhancer
  );
  syncOffline(store);

  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }

  return store;
}
