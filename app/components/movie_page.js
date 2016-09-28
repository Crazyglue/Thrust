/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MoviePage extends Component {
  constructor(props) {
    super(props);

    const movieEndpoint = "";

    this.state = { text: "" };
  }

  login() {

  }

  render() {

    return (
      <View style={{margin: 128}}>
        <TextInput
          style={styles.searchBox}
          onChangeText={(searchText) => this.setState({searchText})}
          value={this.state.text}
          />
        <Icon name="search" />

        <Text >This is PageOne!</Text>
      </View>
    );
  }
}