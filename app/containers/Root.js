import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import Home from '../components/home';
import WhatCDPage from '../components/whatcdpage';
import TransmissionPage from '../components/transmission/transmission_page';
import AppSettings from '../components/settings';

class Root extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("Root props:");
    console.log(this.props);

    return(
      <Router>
        <Scene key="root" hideNavBar={true} passProps={true}>
          <Scene key="home" component={Home} title="Home" initial={true} />
          <Scene key="whatcdpage" component={WhatCDPage} title="WhatCD" />
          <Scene key="transmissionpage" component={TransmissionPage} title="Transmission" />
          <Scene key="appsettings" component={AppSettings} title="App Settings" />
        </Scene>
      </Router>
    )
  }
}

export default Root;
