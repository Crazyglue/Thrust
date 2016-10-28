import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Text, CardItem, Title, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import whatcd_icon from '../../assets/images/what_icon.png';
import { ScrollView, Image } from 'react-native';
import merge from 'lodash/merge'
import ResultDetailIcons from './search/result_detail_icons';
import ResultDetailHeader from './search/result_detail_header';
import TorrentItem from './search/torrent_item';

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

  sortTorrents(a, b) {
    if (a.seeders < b.seeders)
      return 1;
    if (a.seeders > b.seeders)
      return -1;
    return 0;
  }

  render() {
    data = this.props.data;

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
      headerStyle = {
        resizeMode: "cover"
      }
    }
    else {
      headerStyle = {
        height: 50
      }
    }

    img = (data.cover !== "") ? { uri: data.cover } : whatcd_icon;

    return (
      <Card style={{ width: 175, margin: 5, height: 535 }} key={data.groupId} square>
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