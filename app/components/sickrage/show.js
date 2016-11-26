import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

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
    if (rowID != 0) {
      return(
        <ListItem>
          <Text>Season {rowID}</Text>
        </ListItem>
      )
    }
    else {
      return(
        <ListItem style={ { backgroundColor: "orange" } }>
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
          <View style={styles.container}>
            <Image source={{uri: this.props.show.poster}} style={styles.poster} />
            <List
              style={{ width: this.state.windowDimensions.width }}
              dataArray={this.props.show.seasons}
              renderRow={this._renderRow}
              />
            <Text>{this.props.show.status}</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  poster: {
    width: 411 / 1.5,
    height: 605 / 1.5
  },
})
