/*jshint esversion: 6 */

import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Button, Icon, Text, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

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

  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return(
      <CardItem>
        <Grid>
          <Col size={1}>
            <Text style={{color: 'blue'}}>Format</Text>
            <Text>{this.props.data.format}</Text>
          </Col>
          <Col size={1}>
            <Text style={{color: 'blue'}}>Encoding</Text>
            <Text>{this.transformEncoding(this.props.data.encoding)}</Text>
          </Col>
          <Col size={1}>
            <Text style={{color: 'blue'}}>Size</Text>
            <Text>{(this.props.data.size / 1000000).toFixed(2)}MB</Text>
          </Col>
          <Col size={1}>
            <Row>
              <Button onPress={this.props.downloadTorrent.bind(this, this.props.data.torrentId)} transparent>
                <Icon size={24} name="ios-download" />
              </Button>
              <Button onPress={this.props.downloadTorrent.bind(this, this.props.data.torrentId)} transparent>
                <Icon size={24} name="ios-cloud-download" />
              </Button>
            </Row>
          </Col>
        </Grid>
      </CardItem>
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