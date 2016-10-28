import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Text, CardItem, Title, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import whatcd_icon from '../../assets/images/what_icon.png';
import { ScrollView, Image, Dimensions, Platform } from 'react-native';
import merge from 'lodash/merge'
import sortBy from 'lodash/sortBy'
import ResultDetailIcons from './search/result_detail_icons';
import ResultDetailHeader from './search/result_detail_header';
import TorrentItem from './search/torrent_item';

const window = Dimensions.get('window');

class WhatCDResult extends Component {
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

  render() {
    data = this.props.data;

    console.log("window height: ", window.height);

    header = (
      <CardItem style={{ height: 70 }} key={data.groupId + "-header"} >
        <Grid>
          <Row style={{height: 20}}>
            <Text style={{ fontSize: 20 }}>{data.artist}</Text>
          </Row>
          <Row>
            <Text style={{fontSize: 12}}>{data.groupName.slice(0, 28)}</Text>
          </Row>
        </Grid>
      </CardItem>
    );
    torrents = sortBy(data.torrents, 'seeders').reverse();

    fontStyle = {
      fontSize: 12,
    }

    iconStyle = {
      fontSize: 16,
    }

    let rows = [];
    if (!this.state.isCollapsed) {
      torrents.forEach((result) => {
        rows.push(
          <TorrentItem
            key={result.torrentId}
            media={result.media}
            torrentId={result.torrentId}
            encoding={result.encoding}
            format={result.format}
            isFreeLeech={result.isFreeLeech}
            isNeutralLeech={result.isNeutralLeech}
            size={result.size}
            seeders={result.seeders}
            leechers={result.seeders}
            snatches={result.snatches}
            fileCount={result.fileCount}
            downloadTorrent={this.props.downloadTorrent}
            cover={result.cover}
            />
        );
      })
    }

    if (this.state.isCollapsed) {
      torrentDetails = [(<ResultDetailHeader key={data.groupId + "-header"} releaseType={data.releaseType} tags={data.tags} groupYear={data.groupYear} />),
      (<ResultDetailIcons key={data.groupId} totalSnatched={data.totalSnatched} totalSeeders={data.totalSeeders} totalLeechers={data.totalLeechers} />)]
    }
    else {
      torrentDetails = (
        <ScrollView style={{height: 75}}>
          {rows}
        </ScrollView>
      )
    }

    if (this.state.isCollapsed) {
       height = (Platform.OS === 'ios') ? window.height - 367 : window.height - 390

      headerStyle = {
        height: height
      }
    }
    else {
      headerStyle = {
        height: 50
      }
    }

    img = (data.cover !== "") ? { uri: data.cover } : whatcd_icon;

    console.log("rerendering whatcdResult")
    return (
      <Card style={{ width: 175, margin: 5}} key={data.groupId} square>
        <CardItem onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed})}>
          <Image style={headerStyle} source={img} square/>
        </CardItem>
        {header}
        {torrentDetails}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    downloadTorrent: state.whatcd.api.downloadTorrent
  }
}

export default connect(mapStateToProps, actionCreators)(WhatCDResult);