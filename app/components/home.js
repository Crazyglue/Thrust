/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/whatcd';

class Home extends Component {
  componentWillMount() {
    this.props.loadOfflineCredentials();
  }

  render() {
    const goToWhatCD = () => Actions.whatcdpage();
    const goToTransmission = () => Actions.transmissionpage();
    const goToMoviePage = () => Actions.moviepage();
    const goToAppSettings = () => Actions.appsettings();

    return (
      <View style={{margin: 128, flex: 1}}>
        <Text onPress={goToWhatCD}>Go to WhatCD</Text>
        <Text onPress={goToTransmission}>Go to Transmission!</Text>
        <Text onPress={goToMoviePage}>Go to movies!</Text>
        <Text onPress={goToAppSettings}>App Settings</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    username: state.whatcd.username,
    password: state.whatcd.password,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(Home);
