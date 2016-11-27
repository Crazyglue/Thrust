import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
import ParallaxView from 'react-native-parallax-view';

export default class Season extends Component {
  constructor(params) {
    super(params);

    this.state = {
      // height: ###, width: ###, scale: #
    };
  }

  _renderRow(episode, index, rowID, highlightRow) {
    return (
      <ListItem>
        <Col>
          <Row><Title>{episode.name}</Title></Row>
          <Row><Text>Status: {episode.status}</Text></Row>
          <Row><Text>{episode.quality}</Text></Row>
        </Col>
      </ListItem>
    )
  }

  render() {
    console.log("Season Props:");
    console.log(this.props);
    // console.log("seasons:", this.props.show.seasons);

    return (
      <Container>
        <Header>
          <Title>Season {this.props.seasonNumber}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <List
            renderRow={this._renderRow}
            dataArray={this.props.episodes}
            />
        </Content>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  episodeWrapper: {
    flex: 1,
    flexDirection: 'column'
  }
})
