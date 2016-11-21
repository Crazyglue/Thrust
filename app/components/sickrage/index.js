import React, { Component } from 'react';
import { Modal, Platform, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sickrage';
import store from 'react-native-simple-store';
import { Container, Header, Content, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
import SearchHeader from '../shared/nav/search_header';

class SickRage extends Component {
  constructor(params) {
    super(params);

    this.state = {};
  }

  componentDidMount() {
    this.props.getShows();
  }

  renderRow(show) {
    return(
      <ListItem>
        <Image style={{ width: 758/2.2, height: 140/2.2 }} source={{uri: show.image}} />
      </ListItem>
    )
  }


  render() {
    // console.log("SickRage Props:");
    // console.log(this.props);

    let shows = this.props.sickrage.shows || [];

    const getShows = () => this.props.getShows();

    console.log("shows", shows);

    return (
      <Container>
        <Header>
          <Title>{this.props.title}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <ScrollView>
            <List
              dataArray={this.props.sickrage.shows}
              renderRow={this.renderRow}
              />
          </ScrollView>
        </Content>
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    sickrage: state.sickrage
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(SickRage);
