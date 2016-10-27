import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import { Button, Icon, Text, CardItem, Thumbnail, Title, List, ListItem, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import whatcd_icon from '../../assets/images/what_icon.png';
import { ScrollView, Image } from 'react-native';

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
            <Text style={{fontSize: 12}}>{data.groupName}</Text>
          </Row>
        </Grid>
      </CardItem>
    );
    torrents = data.torrents.sort(this.sortTorrents);

    if (this.state.isCollapsed == false) {
      torrents.forEach((result) => {
        rows.push(
          <CardItem key={result.torrentId} cardBody>
            <Grid>
              <Col size={3}>
                <Text>{result.format}</Text>
              </Col>
              <Col size={5}>
                <Text>{result.encoding}</Text>
              </Col>
              <Col size={4}>
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

    groupDetail = [
      (<CardItem key="year-type">
          <Text>{data.releaseType} ({data.groupYear})</Text>
          <Text>Some other data</Text>
      </CardItem>),
      (<CardItem style={{height: 80}} key="tags">
        <Text style={{fontSize: 12}}>Tags</Text>
        <Text style={{fontSize: 8, lineHeight: 8}}>{data.tags.join(", ")}</Text>
      </CardItem>)
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
      <Card style={{ width: 175, margin: 5 }} key={data.groupId} square>
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