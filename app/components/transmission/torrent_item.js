import React, { Component } from 'react';
import { Title, Text, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Progress from 'react-native-progress';
import isEqual from 'lodash/isEqual';
import bytes from 'bytes';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TorrentItem extends Component {
  constructor(params) {
    super(params);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    // console.log("TorrentItem Props:");
    // console.log(this.props);
    torrent = this.props.data;

    return(
      <ListItem key={torrent.name}>
        <Grid>
          <Col size={3}>
            <Row>
              <Text>{torrent.name.slice(0,36)}</Text>
            </Row>
            <Col>
              <Row>
                <Text style={{fontSize: 10, lineHeight: 10}}>{torrent.status}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 10, lineHeight: 10}}>{(torrent.eta > -1) ? torrent.eta : "" }</Text>
              </Row>
            </Col>
            <Col>
              <Text>{((torrent.sizeWhenDone - torrent.leftUntilDone) / 1000000).toFixed(2)} / {(torrent.sizeWhenDone / 1000000).toFixed(2)} MB</Text>
            </Col>
          </Col>
          <Col size={1}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Icon name="arrow-upward" style={{ fontSize: 15, lineHeight: 20}} />
              <Text>{bytes(torrent.rateUpload, {decimalPlaces: 1, unitSeperator: " "})}/s</Text>
            </Row>
            <Row>
              <Progress.Bar height={30} width={87} borderRadius={2} progress={torrent.percentDone} />
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
              <Icon name="arrow-downward"  style={{ fontSize: 15, lineHeight: 20}} />
              <Text>{bytes(torrent.rateDownload, {decimalPlaces: 1, unitSeperator: " "})}/s</Text>
            </Row>
          </Col>
        </Grid>
      </ListItem>
    )
  }
}
