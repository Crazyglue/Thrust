/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  Image,
} from 'react-native';
import Accordion from 'react-native-accordion';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';

class WhatCDResultList extends Component {
  constructor(params) {

    super(params);
  }

  downloadTorrent(data) {
    this.props.downloadTorrent(data);
  }

  _renderRow(data) {
    console.log("Rendering row data...");
    console.log(data);

    header = (
      <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
        <Image style={{width: 50, height: 50}} source={{ uri: data.cover }} /><Text>{data.artist} - {data.groupName}</Text>
      </View>
    );

    content = (
      <View style={{ height: 50 }}>
        <Text onPress={() => this.props.downloadTorrent(data)}>Click here to download!</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }

  render() {
    console.log("WhatCD Result List props:");
    console.log(this.props);

    return(
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <ListView
          dataSource={this.props.data}
          renderRow={this._renderRow.bind(this)}
          />
      </ScrollView>
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
export default connect(mapStateToProps, actionCreators)(WhatCDResultList);