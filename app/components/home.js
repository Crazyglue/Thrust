/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';


export default class Home extends Component {
  render() {
    const goToWhatCD = () => Actions.whatcdpage();
    const goToMoviePage = () => Actions.moviepage();
    const goToAppSettings = () => Actions.appsettings();


    return (
      <View style={{margin: 128, flex: 1}}>
        <Text onPress={goToWhatCD}>Go to WhatCD</Text>
        <Text onPress={goToMoviePage}>Go to movies!</Text>
        <Text onPress={goToAppSettings}>App Settings</Text>
      </View>
    );
  }
}