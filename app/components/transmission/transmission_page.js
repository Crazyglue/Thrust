/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../../stylesheets/default';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';

class TransmissionPage extends Component {
  constructor(params) {
    super(params);
  }

  getStats() {
    this.props.getStats();
  }

  render() {
    console.log("TransmissionPage Props:");
    console.log(this.props);

    return(
      <View style={styles.container}>
        <Button onPress={this.getStats.bind(this)} >Get Stats</Button>
        <Button onPress={() => this.props.getTorrentInfo([])}>Get Torrent Info</Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transmission: state.transmission,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionPage);
