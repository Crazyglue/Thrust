/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import config from '../../config/config';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/login';
import WhatCDRequest from '../utils/whatcd_request';
import Button from 'apsl-react-native-button';

import offline from 'react-native-simple-store';

class AppSettings extends Component {
  constructor(props) {
    super(props);

    this.whatcd = new WhatCDRequest();

    this.state = {
      usernameText: '',
      passwordText: ''
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.passwordText != this.state.passwordText) {
      this.props.setPassword(nextState.passwordText);
    }
    if (nextState.usernameText != this.state.usernameText) {
      this.props.setUsername(nextState.usernameText);
    }
  }

  render() {
    console.log("State")
    console.log(this.props.login);

    offline.get("username").then((username) => {
      console.log("AppSettings username: " + username);
    });
    offline.get("password").then((password) => {
      console.log("AppSettings password: " + password);
    });

    return(
      <View style={styles.container}>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            style={styles.searchBox}
            onChangeText={(usernameText) => this.setState({usernameText})}
            value={this.state.usernameText}
            />
        </View>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.searchBox}
            onChangeText={(passwordText) => this.setState({passwordText})}
            value={this.state.passwordText}
            />
        </View>
        <View>
          <Button onPress={this.whatcd.login}>Login</Button>
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
