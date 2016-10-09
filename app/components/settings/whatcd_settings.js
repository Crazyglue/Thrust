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
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
      <View style={{alignSelf: 'stretch'}}>
        <View>
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'Username'}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            onChangeText={(usernameText) => this.props.setUsername(usernameText)}
            defaultValue={this.props.username}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
        </View>
        <View>
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'Password'}
            iconClass={FontAwesomeIcon}
            iconName={'key'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            defaultValue={this.props.password}
            secureTextEntry={true}
            onChangeText={(passwordText) => this.props.setPassword(passwordText)}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
        </View>
        <View>
          <Button onPress={this.login.bind(this)}>Login</Button>
        </View>
        <View>
          <Text style={styles.labelText}>{this.props.username}</Text>
          <Text style={styles.labelText}>{this.props.password}</Text>
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
    whatcd: state.whatcd,
    username: state.whatcd.username,
    password: state.whatcd.password,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDSettings);
