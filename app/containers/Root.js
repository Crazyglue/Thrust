import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import Home from '../components/home';
import WhatCDPage from '../components/whatcdpage';
import TransmissionPage from '../components/transmission/transmission_page';
import SickRage from '../components/sickrage/';
import Show from '../components/sickrage/show';
import Season from '../components/sickrage/season';
import NewShow from '../components/sickrage/new_show';
import AppSettings from '../components/settings';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true} passProps={true}>
    <Scene key="home" component={Home} title="Home" initial={true} />
    <Scene key="whatcdpage" component={WhatCDPage} title="WhatCD" />
    <Scene key="sickrage" component={SickRage} title="Sick Rage" />
    <Scene key="show" component={Show} />
    <Scene key="season" component={Season} />
    <Scene key="newShow" component={NewShow} />
    <Scene key="transmissionpage" component={TransmissionPage} title="Transmission" />
    <Scene key="appsettings" component={AppSettings} title="App Settings" />
  </Scene>
);

export default class Root extends Component {
  constructor(props){
    super(props);
  }

  render() {
    // console.log("Root props:");
    // console.log(this.props);

    return(
      <RouterWithRedux scenes={scenes} />
    )
  }
}
