/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as actionCreators from '../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import WhatCDResultList from './whatcd/whatcd_result_list';
import Accordion from 'react-native-accordion';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';

class WhatCDPage extends Component {
  constructor(params) {
    super(params);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      artistName: "",
      searchText: "",
      filter: '',
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchResult.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.searchResult.results)
      });
    }
  }

  getArtist() {
    this.setState({ text: this.props.whatcd.getArtist() });
  }

  getTorrent() {
    this.props.getTorrent(this.state.searchText);
  }

  downloadTorrent(rowData) {
    console.log("Passing rowData: ");
    console.log(rowData);
    this.props.downloadTorrent(rowData);
  }

  getUser() {
    this.props.whatcd.whatcd.getUser();
  }

  printUserData() {
    store.get('user_info').then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.warn("NO USER INFO LOADED");
      console.warn(error);
    })
    .done();
  }

  search(searchText) {

    if (this.state.filter == "artist")
      this.props.getArtist(searchText);
    else if (this.state.filter == "torrents")
      this.props.getTorrent(searchText);
    else if (this.state.filter == "user")
      this.props.getUser(searchText);
    else
      this.props.getTorrent(searchText);

  }

  updateFilter(filter) {
    this.setState({ filter: filter })
  }

  render() {
    console.log("WhatCDPage Props:");
    console.log(this.props);

    console.log("searchResult:");
    console.log(this.props.searchResult);
    let notLoggedIn;

    if (!this.props.isLoggedIn) {
      notLoggedIn = (
        <Icon name="ios-alert" style={{color: "red"}} />
      )
    }

    return(
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>What CD</Title>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content style={{width: 350}}>
          <InputGroup borderType='rounded' style={{margin: 10}} disabled={!this.props.isLoggedIn}>
            <Icon name='ios-search' style={{color:'#384850'}}/>
            <Input
              onSubmitEditing={this.search.bind(this, this.state.searchText)}
              placeholder='Search WhatCD'
              value={this.state.searchText}
              onChangeText={(searchText) => this.setState({searchText})}
              blurOnSubmit={true}
              />
            {notLoggedIn}
          </InputGroup>

          <WhatCDResultList
            data={this.props.searchResult.results}
            />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    getUser: state.whatcd.getUser,
    getTorrent: state.whatcd.getTorrent,
    getArtist: state.whatcd.getArtist,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDPage);
