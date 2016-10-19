import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import TorrentList from './torrent_list';
import TorrentListItem from './torrent_list_item';
import { ListView, } from 'react-native';
import { Container, Header, Content, Title, Button, Icon, List, ListItem, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class WhatCDResultList extends Component {
  constructor(params) {
    super(params);
  }

  _renderRow(data) {
    return(
      <TorrentListItem data={data} />
    )
  }

  render() {
    console.log("WhatCD Result List props:");
    console.log(this.props);

    return(
      <Content>
        <List
          dataArray={this.props.searchResult.results}
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