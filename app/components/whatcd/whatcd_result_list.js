import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import TorrentList from './torrent_list';
import TorrentListItem from './torrent_list_item';
import { ListView, ScrollView } from 'react-native';
import { Container, Header, Content, Title, Button, Icon, List, ListItem, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import sortBy from 'lodash/sortBy';

class WhatCDResultList extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    // console.log("WhatCD Result List props:");
    // console.log(this.props);

    let items = [];

    if (this.props.searchResult && this.props.searchResult.results) {
      sortBy(this.props.searchResult.results, 'totalSeeders').reverse().forEach((result) => {
        items.push(
          <TorrentListItem key={result.groupId} data={result} />
        );
      });
    }

    return(
      <Content>
        <ScrollView horizontal={true}>
          {items}
        </ScrollView>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDResultList);