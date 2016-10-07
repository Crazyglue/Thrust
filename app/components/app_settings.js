/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/login';
import WhatCDRequest from '../utils/whatcd_request';
import Button from 'apsl-react-native-button';

import offline from 'react-native-simple-store';

class AppSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: this.props.login.username,
      passwordText: this.props.login.password
    };
  }

  login() {
    this.props.login.whatcd.login();
  }

  render() {
    console.log("Props");
    console.log(this.props);

    return(
      <View style={styles.container}>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            style={styles.searchBox}
            onChangeText={(usernameText) => this.props.setUsername(usernameText)}
            value={this.props.login.username}
            />
        </View>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.searchBox}
            onChangeText={(passwordText) => this.props.setPassword(passwordText)}
            value={this.props.login.password}
            />
        </View>
        <View>
          <Button onPress={this.login.bind(this)}>Login</Button>
        </View>
        <View>
          <Text style={styles.labelText}>{this.props.login.username}</Text>
          <Text style={styles.labelText}>{this.props.login.password}</Text>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(AppSettings);
