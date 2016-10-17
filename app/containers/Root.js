/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import Home from '../components/home';
import WhatCDPage from '../components/whatcdpage';
import TransmissionPage from '../components/transmission/transmission_page';
import AppSettings from '../components/settings';
import configureStore from '../stores/configure_store';

const store = configureStore();

class Root extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true} passProps={true}>
            <Scene key="home" component={Home} title="Home" initial={true} />
            <Scene key="whatcdpage" component={WhatCDPage} title="WhatCD" />
            <Scene key="transmissionpage" component={TransmissionPage} title="Transmission" />
            <Scene key="appsettings" component={AppSettings} title="App Settings" />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

export default Root;
