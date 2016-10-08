/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../../stylesheets/default';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/whatcd';
import WhatCDRequest from '../../api/whatcd_request';
import Button from 'apsl-react-native-button';

import offline from 'react-native-simple-store';

class WhatCDSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: '',
      passwordText: ''
    };
  }

  login() {
    this.props.login();
  }

  render() {
    console.log("Props");
    console.log(this.props);
    let userData = [];

    if(this.props.whatcd.userData) {
      console.log("WhatCD Userdata:");
      console.log(this.props.whatcd.userData);
      userData.push(this.props.whatcd.userData.username);
      userData.push(this.props.whatcd.userData.id);
    }


    return(
      <View>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            style={styles.searchBox}
            onChangeText={(usernameText) => this.props.setUsername(usernameText)}
            value={this.props.whatcd.username}
            />
        </View>
        <View style={styles.inlineSearch}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.searchBox}
            secureTextEntry={true}
            onChangeText={(passwordText) => this.props.setPassword(passwordText)}
            value={this.props.whatcd.password}
            />
        </View>
        <View>
          <Button onPress={this.login.bind(this)}>Login</Button>
        </View>
        <View>
          <Text style={styles.labelText}>{this.props.whatcd.username}</Text>
          <Text style={styles.labelText}>{this.props.whatcd.password}</Text>
        </View>
        <View>
          <Text>{userData}</Text>
        </View>
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
export default connect(mapStateToProps, actionCreators)(WhatCDSettings);
