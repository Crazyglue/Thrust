/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import Accordion from 'react-native-accordion';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class TorrentListItem extends Component {
  constructor(params) {
    super(params);
  }

  transformEncoding(encoding) {
    switch(encoding) {
      case '24bit Lossless':
        return '24b Loss.';
      default:
        return encoding;
    }
  }

  render() {
    console.log("Result List Item props:");
    console.log(this.props);

    return(
      <View style={{ marginRight: 10, marginLeft: 10, height: 40, flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1 }}>
        <View style={{ width: 108, flexDirection: "column", justifyContent: "space-around" }}>
          <Text style={{color: 'blue'}}>Format</Text>
          <Text>{this.props.data.format}</Text>
        </View>
        <View style={{ width: 108, flexDirection: "column", justifyContent: "space-around" }}>
          <Text style={{color: 'blue'}}>Encoding</Text>
          <Text>{this.transformEncoding(this.props.data.encoding)}</Text>
        </View>
        <View style={{ width: 108, flexDirection: "column", justifyContent: "space-around" }}>
          <Text style={{color: 'blue'}}>Size</Text>
          <Text>{(this.props.data.size / 1000000).toFixed(2)}MB</Text>
        </View>
        <View style={{ width: 50, marginTop: 3, marginBottom: 3, flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableHighlight onPress={this.props.downloadTorrent.bind(this, this.props.data.torrentId)}>
            <FontAwesomeIcon size={24} name="download" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.downloadTorrent.bind(this, this.props.data.torrentId)}>
            <FontAwesomeIcon size={24} name="cloud-download" />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    downloadTorrent: state.whatcd.whatcd.downloadTorrent
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TorrentListItem);