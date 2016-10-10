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
import styles from '../stylesheets/default';
import WhatCDRequest from '../api/whatcd_request';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as actionCreators from '../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';

class WhatCDPage extends Component {
  constructor(params) {
    super(params);

    this.whatcd = new WhatCDRequest();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      artistName: "",
      searchText: "",
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    let data;

    if(nextProps.searchResult.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.searchResult.results)
      });
    }
  }

  getArtist() {
    this.setState({ text: this.props.whatcd.getArtist() });
  }

  getTorrent() {
    this.props.getTorrent(this.state.searchText);
  }

  getUser() {
    this.props.whatcd.whatcd.getUser();
  }

  printUserData() {
    store.get('user_info').then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.warn("NO USER INFO LOADED");
      console.warn(error);
    })
    .done();
  }

  render() {
    console.log("WhatCDPage Props:");
    console.log(this.props);

    console.log("searchResult:");
    console.log(this.props.searchResult);

    return(
      <View style={styles.container}>
        <Fumi
            style={{alignSelf: 'stretch'}}
            label={'Search WhatCD'}
            iconClass={FontAwesomeIcon}
            iconName={'key'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}

            blurOnSubmit={true}
            onSubmitEditing={this.getTorrent.bind(this, this.state.searchText)}
            />
        <ScrollView
          scrollEventThrottle={200}
          style={{ border: 1, borderWidth: 2, backgroundColor: '#6A85B1', height: 400, alignSelf: 'stretch' }}
          >
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(rowData) => <Text>{rowData.artist} - {rowData.groupName}</Text>}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDPage);
