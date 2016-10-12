/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import Accordion from 'react-native-accordion';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TorrentList from './torrent_list';
import TorrentListItem from './torrent_list_item';
import { Container, Header, Content, Title, Button, Icon, List, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class WhatCDResultList extends Component {
  constructor(params) {
    super(params);
  }

  _renderRow(data) {
    console.log("Rendering row data...");
    console.log(data);

    img = data.cover ? { uri: data.cover } : null;

    var rows = [];

    if(data.torrents.length > 0) {
      header = (
        <CardItem style={{height:60}}>
          <Grid>
            <Col size={1}>
              <Thumbnail size={40} source={img} square/>
            </Col>
            <Col size={5}>
              <Title left>{data.artist} - {data.groupName}</Title>
            </Col>
          </Grid>
        </CardItem>
      );
      rows.push(header);
      data.torrents.forEach((result) => {
        rows.push(<TorrentListItem key={result.torrentId} data={result} />);
      });
    }

    content = (
      <Card>
        {rows}
      </Card>
    );

    return (
      content
    );
  }

  render() {
    console.log("WhatCD Result List props:");
    console.log(this.props);

    return(
      <Content>
        <List
          dataArray={this.props.data}
          renderRow={this._renderRow.bind(this)}
          />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDResultList);