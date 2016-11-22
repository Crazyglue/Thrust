import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import Home from '../components/home';
import WhatCDPage from '../components/whatcdpage';
import TransmissionPage from '../components/transmission/transmission_page';
import SickRage from '../components/sickrage/';
import Show from '../components/sickrage/show';
import AppSettings from '../components/settings';

const RouterWithRedux = connect()(Router);

class Root extends Component {
  constructor(props){
    super(props);
  }

  render() {
    // console.log("Root props:");
    // console.log(this.props);

    return(
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true} passProps={true}>
          <Scene key="home" component={Home} title="Home" initial={true} />
          <Scene key="whatcdpage" component={WhatCDPage} title="WhatCD" />
          <Scene key="sickrage" component={SickRage} title="Sick Rage">
            <Scene key="sickrageShow" component={Show} title="Show" />
          </Scene>
          <Scene key="transmissionpage" component={TransmissionPage} title="Transmission" />
          <Scene key="appsettings" component={AppSettings} title="App Settings" />
        </Scene>
      </RouterWithRedux>
    )
  }
}

export default Root;
