import React, { Component, PropTypes } from 'react';
import { Modal, Platform, ScrollView, Image, InteractionManager, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/the_tv_db';
import store from 'react-native-simple-store';
import { Container, Header, Content, Fab, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

class TheTvDb extends Component {
  constructor(params) {
    super(params);

    this.state = {
      string: ""
    };
  }

  _renderRow(result) {
    return (
      <ListItem>
        <Title>{result.seriesName}</Title>
        <Text>ID: {result.id}</Text>
      </ListItem>
    )
  }

  render() {
    console.log("The TV DB Props:");
    console.log(this.props);
    const searchSeries = () => this.props.searchSeries("Top Gear")

    return (
      <Container>
        <Header>
          <Title>{this.props.title}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <Button onPress={this.props.login} >
            Login
          </Button>
          <Button onPress={searchSeries} >
            Search Series
          </Button>

          <List
            dataArray={this.props.results}
            renderRow={this._renderRow}
            />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.the_tv_db.searchResult
  }
}

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TheTvDb);
