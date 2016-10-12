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
import * as actionCreators from '../../actions/transmission';
import Button from 'apsl-react-native-button';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';

import offline from 'react-native-simple-store';

class TransmissionSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localUrl: '',
      localPort: '',
      urlWeb: '',
      portWeb: '',
    };
  }

  render() {
    console.log("Transmission Settings Props");
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
            onChangeText={(localUrl) => this.props.setLocalUrl(localUrl)}
            defaultValue={this.props.api.localUrl}

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
            defaultValue={this.props.api.localPort}
            onChangeText={(localPort) => this.props.setLocalPort(localPort)}

            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />
        </View>
        <View>
          <Button style={{width: 100}}>Test Connection</Button>
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
  console.log("mapStateToProps:");
  console.log(state);
  return {
    api: state.transmission.api,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionSettings);
