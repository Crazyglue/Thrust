import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Button, Icon, Text, CardItem, Thumbnail, Title, List, ListItem, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import whatcd_icon from '../../assets/images/what_icon.png';
import { ScrollView, Image } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import merge from 'lodash/merge'
import ResultDetailIcons from './search/result_detail_icons';
import ResultDetailHeader from './search/result_detail_header';

class TorrentListItem extends Component {
  constructor(params) {
    super(params);

    this.state = {
      isCollapsed: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data)
      this.setState({ isCollapsed: true });
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
      <CardItem key={data.groupId + "-header"} >
        <Grid>
          <Row>
            <Title left>{data.artist}</Title>
          </Row>
          <Row>
            <Text style={{fontSize: 12}}>{data.groupName.slice(0, 28)}</Text>
          </Row>
        </Grid>
      </CardItem>
    );
    torrents = data.torrents.sort(this.sortTorrents);

    fontStyle = {
      fontSize: 12,
    }

    iconStyle = {
      fontSize: 16,
    }

    if (this.state.isCollapsed == false) {
      torrents.forEach((result) => {
        rows.push(
          <CardItem key={result.torrentId + "-header"} style={{height: 10, padding: 0}} header>
            <Text style={{fontSize: 2, lineHeight: 2}}> </Text>
          </CardItem>,
          <CardItem key={result.torrentId} cardBody>
            <Grid>
              <Col size={3}>
                <Row><Text style={fontStyle}>{result.media}</Text></Row>
                <Row><Text style={fontStyle}>{result.format} ({result.encoding.slice(0,8)})</Text></Row>
                <Row>
                  <Text style={fontStyle}>{result.isFreeLeech == true ? "FL" : ""}{result.isNeutralLeech == true ? "NL" : ""}</Text>
                </Row>
                <Row><MDIcon name="dns" style={iconStyle} /><Text style={fontStyle}>{(result.size / 1000000).toFixed(1)}MB</Text></Row>
              </Col>
              <Col size={1}>
                <Row style={{justifyContent: "space-between"}}><Icon name="ios-arrow-round-up" style={iconStyle} /><Text style={fontStyle}>{result.seeders}</Text></Row>
                <Row style={{justifyContent: "space-between"}}><Icon name="ios-arrow-round-down" style={iconStyle} /><Text style={fontStyle}>{result.leechers}</Text></Row>
                <Row style={{justifyContent: "space-between"}}><Icon name="ios-checkmark" style={iconStyle} /><Text  style={fontStyle}>{result.snatches}</Text></Row>
                <Row style={{justifyContent: "space-between"}}><Icon name="ios-disc" style={iconStyle} /><Text style={fontStyle}>{result.fileCount}</Text></Row>
              </Col>
              <Col style={{justifyContent: "space-around"}} size={1}>
                <Button onPress={this.props.downloadTorrent.bind(this, result.torrentId)} transparent>
                  <MDIcon size={24} name="cloud-download" />
                </Button>
              </Col>
            </Grid>
          </CardItem>
        );
      });
    }

    groupDetail = [
      (<ResultDetailHeader key={data.groupId + "-header"} releaseType={data.releaseType} tags={data.tags} groupYear={data.groupYear} />),
      (<ResultDetailIcons key={data.groupId} totalSnatched={data.totalSnatched} totalSeeders={data.totalSeeders} totalLeechers={data.totalLeechers} />)
    ]

    torrentResult = (
      <ScrollView style={{height: 75}}>
        {rows}
      </ScrollView>
    )

    if (this.state.isCollapsed) {
      headerStyle = {
        resizeMode: "cover"
      }
    }
    else {
      headerStyle = {
        height: 50
      }
    }


    return (
      <Card style={{ width: 175, margin: 5, height: 535 }} key={data.groupId} square>
        <CardItem onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed})}>
          <Image style={headerStyle} source={img} square/>
        </CardItem>
        {header}
        {this.state.isCollapsed ? groupDetail : torrentResult}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    downloadTorrent: state.whatcd.api.downloadTorrent
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TorrentListItem);