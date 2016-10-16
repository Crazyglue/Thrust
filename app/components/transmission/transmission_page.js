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

class TransmissionPage extends Component {
  constructor(params) {
    super(params);
  }

  componentDidMount() {
    this.props.getTorrentInfo([]);
    timer.setInterval("transmission_ping", () => {
      this.props.getTorrentInfo([]);
    }, 400);
  }

  componentWillUnmount() {
    timer.clearInterval("transmission_ping");
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
        <ListItem key={torrent.name}>
          <Grid>
            <Row>
              <Title>{torrent.name}</Title>
            </Row>
            <Row style={{ justifyContent: 'space-around'}} >
              <Progress.Bar height={30} width={300} progress={torrent.percentDone} />
            </Row>
            <Row style={{marginTop: 20, marginBottom: 20}}>
              <Col size={1}>
                <Text>D: {(torrent.rateDownload / 1000).toFixed(2)} KB/s</Text>
                <Text>U: {(torrent.rateUpload / 1000).toFixed(2)} KB/s</Text>
              </Col>
              <Col size={1}>
                <Text>{torrent.eta}</Text>
              </Col>
              <Col size={1}>
                <Text>Status: {this.props.transmission.api.parseTorrentStatus(torrent.status)}</Text>
              </Col>
            </Row>
          </Grid>
        </ListItem>
      )
    });

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
          <List>
            {rows}
          </List>

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
