/*jshint esversion: 6 */

import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import styles from '../../stylesheets/default';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import timer from 'react-native-timer';
import TorrentItem from './torrent_item';

class TransmissionPage extends Component {
  constructor(params) {
    super(params);
  }

  componentDidMount() {
    this.props.getTorrentInfo([]);
    timer.setInterval("transmission_ping", () => {
      this.props.getTorrentInfo([]);
    }, 1000);
  }

  componentWillUnmount() {
    timer.clearInterval("transmission_ping");
  }

  getStats() {
    this.props.getStats();
  }

  renderTorrent(data) {
    data.status = this.props.transmission.api.parseTorrentStatus(data.status);
    return (<TorrentItem data={data} />)
  }

  render() {
    console.log("TransmissionPage Props:");
    console.log(this.props);
    return(
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>Transmission</Title>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content>
          <Button onPress={this.getStats.bind(this)} block primary>Get Stats</Button>
          <Button onPress={() => this.props.getTorrentInfo([])} block warning>Get Torrent Info</Button>
          <List
            dataArray={this.props.transmission.displayTorrents}
            renderRow={this.renderTorrent.bind(this)}
            />

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
