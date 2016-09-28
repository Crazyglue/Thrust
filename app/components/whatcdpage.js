/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import WhatCDRequest from '../utils/whatcd_request';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import store from 'react-native-simple-store';

export default class WhatCDPage extends Component {
  constructor(params) {
    super(params);

    this.whatcd = new WhatCDRequest();

    this.state = {
      artistName: "",
      searchText: ""
    };
  }

  getArtist() {
    this.setState({ text: this.props.whatcd.getArtist() });
  }

  getTorrent() {
    this.props.whatcd.getTorrent(this.state.searchText);
  }

  getUser() {
    this.props.whatcd.getUser();
  }

  printUserData() {
    store.get('user_info').then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.warn("NO USER INFO LOADED");
      console.warn(error);
    })
    .done();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Search WhatCD</Text>
        <View style={styles.inlineSearch}>
          <TextInput
            style={styles.searchBox}
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}
            />
          <Icon
            style={styles.searchIcon}
            name="search"
            onPress={this.getTorrent.bind(this)}
            />
        </View>
        <Text value={this.state.text} style={styles.welcome}></Text>
        <Button onPress={this.getUser.bind(this)}>Get User</Button>
        <Button onPress={this.printUserData}>PrintData</Button>
      </View>
    )
  }
}