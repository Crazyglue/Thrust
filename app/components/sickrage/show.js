import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
import ParallaxView from 'react-native-parallax-view';

export default class Show extends Component {
  constructor(params) {
    super(params);

    this.state = {
      // height: ###, width: ###, scale: #
      windowDimensions: Dimensions.get('window')
    };
  }

  _renderRow(season, index, rowID, highlightRow) {
    // console.log("renderRow() season", season)
    // console.log("renderRow() index", index);
    // console.log("renderRow() rowID", rowID);
    // console.log("renderRow() highlightRow", highlightRow);
    onPress = () => Actions.season({episodes: season, seasonNumber: rowID})
    if (rowID != 0) {
      return(
        <ListItem styles={styles.seasons} onPress={onPress}>
          <Text>Season {rowID}</Text>
        </ListItem>
      )
    }
    else {
      return(
        <ListItem key={rowID} style={ _.merge({}, styles.season, styles.extra) } onPress={ onPress } >
          <Text>Extras!</Text>
        </ListItem>
      )
    }
  }

  render() {
    console.log("Show Props:");
    console.log(this.props);
    // console.log("seasons:", this.props.show.seasons);

    return (
      <Container>
        <Header>
          <Title>{this.props.show.show_name}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <Image source={{uri: this.props.show.poster}} style={styles.poster} />
          <List
            style={{ width: this.state.windowDimensions.width - 20, padding: 0 }}
            dataArray={this.props.show.seasons}
            renderRow={this._renderRow}
            />
        </Content>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
  },
  poster: {
    // width: 411 / 1.5,
    // height: 605 / 1.5,
    // alignItems: "center"
    width: Dimensions.get('window').width,
    height: 400
  },
  season: {
    marginRight: 15
  },
  extra: {
    backgroundColor: "orange"
  }
})
