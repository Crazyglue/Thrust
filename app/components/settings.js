import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/whatcd';
import WhatCDSettings from './settings/whatcd_settings';
import TransmissionSettings from './settings/transmission_settings';
import SickrageSettings from './settings/sickrage_settings';
import { Col, Row, Grid } from 'react-native-easy-grid';

import offline from 'react-native-simple-store';

class AppSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: this.props.whatcd.username,
      passwordText: this.props.whatcd.password
    };
  }

  login() {
    this.props.whatcd.api.login();
  }

  render() {
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
          <ScrollView>
            <WhatCDSettings />
            <TransmissionSettings />
            <SickrageSettings />
          </ScrollView>
        </Content>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(AppSettings);
