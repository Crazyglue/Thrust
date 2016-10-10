/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../../stylesheets/default';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/whatcd';
import Button from 'apsl-react-native-button';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';

import offline from 'react-native-simple-store';

class WhatCDSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: '',
      passwordText: '',
      buttonState: 'Log in'
    };
  }

  login() {
    this.props.login();
  }

  componentWillReceiveProps(nextProps) {
    let buttonState = 'idle';
    if(nextProps.isLoggedIn)
      buttonState = 'success';
    if(nextProps.isLoggingIn)
      buttonState = "busy";
    this.setState({ buttonState: buttonState });
  }

  render() {
    console.log("Props");
    console.log(this.props);
    console.log("ButtonState: ");
    console.log(this.state.buttonState);

    return(
      <View style={{alignSelf: 'stretch'}}>
        <Text style={{ textAlign: 'left' }}>WhatCD:</Text>
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
        <View style={buttonStyles.container}>
          <AwesomeButton  backgroundStyle={buttonStyles.loginButtonBackground}
            labelStyle={buttonStyles.loginButtonLabel}
            transitionDuration={200}
            states={{
              idle: {
                text: 'Log In',
                onPress: this.login.bind(this),
                backgroundColor: '#1155DD',
              },
              busy: {
                text: 'Logging In',
                backgroundColor: '#002299',
                spinner: true,
              },
              success: {
                text: 'Logged In',
                backgroundColor: '#339944'
              }
            }}
            buttonState={this.state.buttonState}
            />
        </View>
      </View>
    )
  }

}

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  loginButtonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 5
  },
  loginButtonLabel: {
    color: 'white',
    width: 300
  }
})

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    username: state.whatcd.username,
    password: state.whatcd.password,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDSettings);
