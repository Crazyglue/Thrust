import React, { Component, PropTypes } from 'react';
import { Modal, Platform, ScrollView, Image, InteractionManager, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sickrage';
import store from 'react-native-simple-store';
import { Container, Header, Content, Fab, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

class SickRage extends Component {
  constructor(params) {
    super(params);

    this.state = {
      renderPlaceholderOnly: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    })
  }

  // TODO: fix the width and height to use layout sizing
  renderRow(show) {
    const goToShow = () => Actions.show({show: show});
    let image;

    if (show && show.image)
      image = <Image style={{ width: 758/2.2, height: 140/2.2 }} source={{uri: show.image}} />
    else
      image = ''

    return(
      <ListItem onPress={goToShow}>
        {image}
      </ListItem>
    )
  }

  render() {
    // console.log("SickRage Props:");
    // console.log(this.props);

    let shows = this.props.sickrage.shows || [];

    return (
      <Container>
        <Header>
          <Title>{this.props.title}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          {this.state.renderPlaceholderOnly ?
          <Spinner /> :
          <List
            dataArray={shows}
            renderRow={this.renderRow}
            />
          }
        </Content>
        <Fab
          onPress={Actions.newShow}
          >
          <Icon name="md-add" />
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sickrage: state.sickrage
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
export default connect(mapStateToProps, actionCreators)(SickRage);
