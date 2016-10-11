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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TorrentList from './torrent_list';
import ResultListItem from './torrent_list_item';

class WhatCDResultList extends Component {
  constructor(params) {
    super(params);
  }

  _renderRow(data) {
    console.log("Rendering row data...");
    console.log(data);

    header = (
      <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
        <Image style={{width: 50, height: 50}} source={data.cover ? { uri: data.cover } : null} /><Text>{data.artist} - {data.groupName}</Text>
      </View>
    );

    var rows = [];

    if(data.torrents.length > 0) {
      data.torrents.forEach((result) => {
        rows.push(<ResultListItem key={result.torrentId} data={result} />);
      });
    }

    content = (
      <View style={{backgroundColor: "#AAAAAA"}}>
        {rows}
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        activeOpacity={.1}
        easing="easeOutCubic"
        underlayColor={'#FFFFFF'}
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
          enableEmptySections={true}
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