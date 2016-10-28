import React, { Component } from 'react';
import { Title, Text, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Progress from 'react-native-progress';
import isEqual from 'lodash/isEqual';

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
          <Row>
            <Title>{torrent.name}</Title>
          </Row>
          <Row style={{ justifyContent: 'space-around'}} >
            <Progress.Bar height={30} width={300} progress={torrent.percentDone} />
          </Row>
          <Row style={{marginTop: 20, marginBottom: 20}}>
            <Col size={1}>
              <Text>D: {(torrent.rateDownload / 1000).toFixed(2)} KB/s</Text>
              <Text>U: {(torrent.rateUpload / 1000).toFixed(2)} KB/s</Text>
            </Col>
            <Col size={1}>
              <Text>{torrent.eta} seconds</Text>
              <Text>{((torrent.sizeWhenDone - torrent.leftUntilDone) / 1000000).toFixed(2)} / {(torrent.sizeWhenDone / 1000000).toFixed(2)} MB</Text>
            </Col>
            <Col size={1}>
              <Text>Status: {torrent.status}</Text>
            </Col>
          </Row>
        </Grid>
      </ListItem>
    )
  }
}
