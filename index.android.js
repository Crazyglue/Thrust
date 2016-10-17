/*jshint esversion: 6 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Root from './app/containers/Root';
import configureStore from './app/stores/configure_store';

const store = configureStore();

class Thrust extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Thrust', () => Thrust);
