/*jshint esversion: 6 */

import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Button, Icon, Text, CardItem, Thumbnail, Title, List, ListItem, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import whatcd_icon from '../../assets/images/what_icon.png';

class TorrentListItem extends Component {
  constructor(params) {
    super(params);

    this.state = {
      isCollapsed: true,
    };
  }

  transformEncoding(encoding) {
    switch(encoding) {
      case '24bit Lossless':
        return '24b Loss.';
      default:
        return encoding;
    }
  }

  sortTorrents(a, b) {
    if (a.seeders < b.seeders)
      return 1;
    if (a.seeders > b.seeders)
      return -1;
    return 0;
  }

  render() {
    let rows = [];
    data = this.props.data;

    img = (data.cover !== "") ? { uri: data.cover } : whatcd_icon;

    header = (
      <CardItem onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed})} style={{height:60}} header>
        <Grid>
          <Col size={1}>
            <Thumbnail size={40} source={img} square/>
          </Col>
          <Col size={5}>
            <Row>
              <Title left>{data.artist} - {data.groupName}</Title>
            </Row>
            <Row>
              <Text size={5}>{data.torrents.length} results</Text>
            </Row>
          </Col>
        </Grid>
      </CardItem>
    );
    rows.push(header);
    torrents = data.torrents.sort(this.sortTorrents);

    if (this.state.isCollapsed == false) {
      torrents.forEach((result) => {
        rows.push(
          <CardItem key={result.torrentId} cardBody>
            <Grid>
              <Col size={3}>
                <Text style={{color: 'blue'}}>Format</Text>
                <Text>{result.format}</Text>
              </Col>
              <Col size={5}>
                <Text style={{color: 'blue'}}>Encoding</Text>
                <Text>{result.encoding}</Text>
              </Col>
              <Col size={4}>
                <Text style={{color: 'blue'}}>Size</Text>
                <Text>{(result.size / 1000000).toFixed(1)}MB</Text>
              </Col>
              <Col size={3}>
                <Text style={{color: "green"}}>S: {result.seeders}</Text>
                <Text style={{color: "red"}}>L: {result.leechers}</Text>
              </Col>
              <Col size={1}>
                <Button onPress={this.props.downloadTorrent.bind(this, result.torrentId)} transparent>
                  <Icon size={24} name="ios-download" />
                </Button>
              </Col>
            </Grid>
          </CardItem>
        );
      });
    }

    content = (
      <ListItem key={data.groupId}>
        <Card>
          {rows}
        </Card>
      </ListItem>
    );

    return (
      content
    );
  }
}

const mapStateToProps = (state) => {
  return {
    downloadTorrent: state.whatcd.whatcd.downloadTorrent
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TorrentListItem);