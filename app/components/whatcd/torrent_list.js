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

class TorrentList extends Component {
  constructor(params) {
    super(params);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data.torrents)
      });
    }
  }

  _renderRow(data) {
    // console.log("Rendering row data...");
    // console.log(data);

    rows = [];

    data.torrents.forEach((result) => {
      rows.append(
        <Text>{result.format} - {result.encoding} - {result.size / 1000000}MB</Text>
      )
    });
    return (
      <View>
        {rows}
      </View>
    );


  }

  render() {
    // console.log("WhatCD Result List props:");
    // console.log(this.props);

    return(
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={this._renderRow.bind(this)}
        />
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
export default connect(mapStateToProps, actionCreators)(TorrentList);