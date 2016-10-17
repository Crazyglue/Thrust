/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  ListView,
  ScrollView,
  Modal,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as actionCreators from '../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import WhatCDResultList from './whatcd/whatcd_result_list';
import FilterDialog from './whatcd/filter_dialog';
import Accordion from 'react-native-accordion';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

class WhatCDPage extends Component {
  constructor(params) {
    super(params);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      artistName: "",
      searchText: "",
      searchOptions: {
        taglist: []
      },
      dataSource: ds.cloneWithRows([]),
      filterModalVisible: false,
    };
  }

  compareResults(a, b) {
    if (a.torrents.length < b.torrents.length)
      return 1;
    if (a.torrents.length > b.torrents.length)
      return -1;
    return 0;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchResult.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.searchResult.results.sort(this.compareResults))
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
    this.props.whatcd.api.getUser();
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

  updateSearchOptions(searchOptions) {
    console.log("Updating search options..");
    console.log(searchOptions);
    this.setState({ searchOptions: searchOptions });
  }

  toggleModal() {
    this.setState({ filterModalVisible: !this.state.filterModalVisible });
  }

  render() {
    console.log("WhatCDPage Props:");
    console.log(this.props);

    console.log("searchResult:");
    console.log(this.props.searchResult);

    console.log("searchOptions:");
    console.log(this.state.searchOptions);
    let notLoggedIn;
    let searchSpinner;

    if (!this.props.isLoggedIn && !this.props.isLoggingIn) {
      notLoggedIn = (
        <Icon name="ios-alert" style={{color: "red"}} />
      )
    }

    searchSpinner = this.props.whatcdSearchPending ? (<Spinner active={!this.props.whatcdSearchPending} />) : null

    return(
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>What CD</Title>
          <Button transparent>
            <Icon name="ios-stats" style={{ marginRight: 10, color: "blue"}} />
          </Button>
        </Header>
        <Content>
          <InputGroup borderType='rounded' style={{margin: 10}} disabled={!this.props.isLoggedIn  && !this.props.isLoggingIn}>
            <Icon onPress={() => this.props.getTorrent(this.state.searchText, this.state.searchOptions)} name='ios-search' style={{ marginLeft: 10, color:'#384850'}}/>
            <Input
              onSubmitEditing={() => this.props.getTorrent(this.state.searchText, this.state.searchOptions)}
              placeholder='Search WhatCD'
              value={this.state.searchText}
              onChangeText={(searchText) => this.setState({searchText})}
              blurOnSubmit={true}
              />
            {notLoggedIn}

            <Button onPress={() => {this.toggleModal()}}style={{width: 25, height: 25}} transparent>
              <Icon name="ios-funnel-outline" style={{ marginRight: 10, color: "blue"}} />
            </Button>

          </InputGroup>

          {searchSpinner}
          <WhatCDResultList
            data={this.props.searchResult.results}
            />

          <Modal
            animationType={"slide"}
            visible={this.state.filterModalVisible}
            transparent={true}
            ref={(popupFilter) => { this.popupFilter = popupFilter; }}
            >
            <FilterDialog closeModal={this.toggleModal.bind(this)} updateSearchOptions={(options) => this.updateSearchOptions(options)} searchOptions={this.state.searchOptions} />
          </Modal>

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
    whatcdSearchPending: state.whatcd.whatcdSearchPending
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDPage);
