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

class TransmissionSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlLocal: '',
      portLocal: '',
      urlWeb: '',
      portWeb: '',
    };
  }

  render() {
    console.log("Transmission Props");
    console.log(this.props);

    return(
      <View style={{alignSelf: 'stretch'}}>
        <Text style={{ textAlign: 'left' }}>Transmission:</Text>
        <View>
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'LAN url'}
            iconClass={FontAwesomeIcon}
            iconName={'wifi'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            onChangeText={(usernameText) => this.props.setUsername(usernameText)}
            defaultValue={this.props.username}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'LAN port'}
            iconClass={FontAwesomeIcon}
            iconName={'wifi'}
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
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'WEB url'}
            iconClass={FontAwesomeIcon}
            iconName={'globe'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            onChangeText={(usernameText) => this.props.setUsername(usernameText)}
            defaultValue={this.props.username}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'WEB port'}
            iconClass={FontAwesomeIcon}
            iconName={'globe'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            defaultValue={this.props.password}
            secureTextEntry={true}
            onChangeText={(portWeb) => this.props.setPassword(passwordText)}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
        </View>
        <View style={buttonStyles.container}>
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
export default connect(mapStateToProps, actionCreators)(TransmissionSettings);
