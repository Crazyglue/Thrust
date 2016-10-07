/*jshint esversion: 6 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import syncOffline from './sync_offline';
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );
  syncOffline(store);

  return store;
}
