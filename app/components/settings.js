

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
import * as actionCreators from '../actions/whatcd';
import WhatCDRequest from '../api/whatcd_request';
import Button from 'apsl-react-native-button';
import WhatCDSettings from './settings/whatcd_settings';

import offline from 'react-native-simple-store';

class AppSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: this.props.whatcd.username,
      passwordText: this.props.whatcd.password
    };
  }

  login() {
    this.props.whatcd.whatcd.login();
  }

  render() {
    return(
      <View style={styles.container}>
        <WhatCDSettings />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(AppSettings);
