/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import Home from '../components/home';
import WhatCDPage from '../components/whatcdpage';
import MoviePage from '../components/movie_page';
import AppSettings from '../components/settings';
import configureStore from '../stores/configure_store';

const store = configureStore();

class Root extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.loadOfflineCredentials();
  }

  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial={true} />
            <Scene key="whatcdpage" component={WhatCDPage} title="WhatCD" />
            <Scene key="moviepage" component={MoviePage} title="Movie Search" />
            <Scene key="appsettings" component={AppSettings} title="App Settings" />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

export default Root;
