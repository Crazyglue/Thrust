import React, { Component } from 'react';
import { Button, Icon, Text, CardItem, Thumbnail, Title, List, ListItem, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ScrollView, Image } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import merge from 'lodash/merge'

export default class TorrentItem extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    fontStyle = {
      fontSize: 12,
    }

    iconStyle = {
      fontSize: 16,
    }

    return (
      <CardItem key={this.props.torrentId + "-header"} style={{height: 10, padding: 0}} header>
        <Text style={{fontSize: 2, lineHeight: 2}}> </Text>
      </CardItem>,
      <CardItem key={this.props.torrentId} cardBody>
        <Grid>
          <Col size={3}>
            <Row><Text style={fontStyle}>{this.props.media}</Text></Row>
            <Row><Text style={fontStyle}>{this.props.format} ({this.props.encoding.slice(0,8)})</Text></Row>
            <Row>
              <Text style={fontStyle}>{this.props.isFreeLeech == true ? "FL" : ""}{this.props.isNeutralLeech == true ? "NL" : ""}</Text>
            </Row>
            <Row><MDIcon name="dns" style={iconStyle} /><Text style={fontStyle}>{(this.props.size / 1000000).toFixed(1)}MB</Text></Row>
          </Col>
          <Col size={1}>
            <Row style={{justifyContent: "space-between"}}><Icon name="ios-arrow-round-up" style={iconStyle} /><Text style={fontStyle}>{this.props.seeders}</Text></Row>
            <Row style={{justifyContent: "space-between"}}><Icon name="ios-arrow-round-down" style={iconStyle} /><Text style={fontStyle}>{this.props.leechers}</Text></Row>
            <Row style={{justifyContent: "space-between"}}><Icon name="ios-checkmark" style={iconStyle} /><Text  style={fontStyle}>{this.props.snatches}</Text></Row>
            <Row style={{justifyContent: "space-between"}}><Icon name="ios-disc" style={iconStyle} /><Text style={fontStyle}>{this.props.fileCount}</Text></Row>
          </Col>
          <Col style={{justifyContent: "space-around"}} size={1}>
            <Button onPress={() => this.props.downloadTorrent(this.props.torrentId)} transparent>
              <MDIcon size={24} name="cloud-download" />
            </Button>
          </Col>
        </Grid>
      </CardItem>
    );
  }
}

TorrentItem.propTypes = {
  media: React.PropTypes.string,
  torrentId: React.PropTypes.number,
  encoding: React.PropTypes.string,
  format: React.PropTypes.string,
  isFreeLeech: React.PropTypes.bool,
  isNeutralLeech: React.PropTypes.bool,
  size: React.PropTypes.number,
  seeders: React.PropTypes.number,
  leechers: React.PropTypes.number,
  snatches: React.PropTypes.number,
  fileCount: React.PropTypes.number,
  downloadTorrent: React.PropTypes.func
};
