/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from '../../stylesheets/default';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';

class TransmissionPage extends Component {
  constructor(params) {
    super(params);
  }

  getStats() {
    this.props.getStats();
  }

  render() {
    console.log("TransmissionPage Props:");
    console.log(this.props);

    rows = [];

    this.props.transmission.displayTorrents.forEach((torrent) => {
      rows.push(
        <Text key={torrent.name}>{torrent.name}</Text>
      )
    });

    return(
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>App Settings</Title>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content>
          <Button onPress={this.getStats.bind(this)} block primary>Get Stats</Button>
          <Button onPress={() => this.props.getTorrentInfo([])} block warning>Get Torrent Info</Button>
          {rows}

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transmission: state.transmission,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionPage);
