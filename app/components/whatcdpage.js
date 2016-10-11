/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as actionCreators from '../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import WhatCDResultList from './whatcd/whatcd_result_list';
import Accordion from 'react-native-accordion';

class WhatCDPage extends Component {
  constructor(params) {
    super(params);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      artistName: "",
      searchText: "",
      filter: '',
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
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

  downloadTorrent(rowData) {
    console.log("Passing rowData: ");
    console.log(rowData);
    this.props.downloadTorrent(rowData);
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

  search(searchText) {

    if (this.state.filter == "artist")
      this.props.getArtist(searchText);
    else if (this.state.filter == "torrents")
      this.props.getTorrent(searchText);
    else if (this.state.filter == "user")
      this.props.getUser(searchText);
    else
      this.props.getTorrent(searchText);

  }

  updateFilter(filter) {
    this.setState({ filter: filter })
  }

  render() {
    console.log("WhatCDPage Props:");
    console.log(this.props);

    console.log("searchResult:");
    console.log(this.props.searchResult);

    var searchHeader = (
      <View style={{ alignSelf: 'center', height: 35, width: 375, backgroundColor: "#AAAAAA" }}>
        <FontAwesomeIcon style={{alignSelf: 'center' }} size={30} name="filter" />
      </View>
    );

    var searchContent = (
      <View style={{flexDirection: 'row', justifyContent: "space-around" }} >
        <TouchableHighlight onPress={() => this.updateFilter("artist")}>
          <FontAwesomeIcon style={this.state.filter == "artist" ? {backgroundColor: 'red', padding: 5} : {padding: 5}} size={30} name="microphone" />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.updateFilter("torrents")}>
          <FontAwesomeIcon  style={this.state.filter == "torrents" ? {backgroundColor: 'red', padding: 5} : {padding: 5}} size={30} name="tasks" />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.updateFilter("user")}>
          <FontAwesomeIcon style={this.state.filter == "user" ? {backgroundColor: 'red', padding: 5} : {padding: 5}} size={30} name="user" />
        </TouchableHighlight>
      </View>
    );

    return(
      <View style={styles.container}>
        <Fumi
          style={{alignSelf: 'stretch'}}
          label={'Search WhatCD'}
          iconClass={FontAwesomeIcon}
          iconName={'search'}
          iconColor={'blue'}
          autoCorrect={false}
          inputStyle={{ color: '#db786d' }}
          onChangeText={(searchText) => this.setState({searchText})}
          value={this.state.searchText}

          blurOnSubmit={true}
          onSubmitEditing={this.search.bind(this, this.state.searchText)}
          />

        <Accordion
            header={searchHeader}
            content={searchContent}
            easing="easeOutCubic"
            style={{alignSelf: 'stretch'}}
          />

        <WhatCDResultList
          data={this.state.dataSource}
          />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    getUser: state.whatcd.getUser,
    getTorrent: state.whatcd.getTorrent,
    getArtist: state.whatcd.getArtist,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDPage);
