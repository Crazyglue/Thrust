import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Title, Button, Icon, Text, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Show extends Component {
  constructor(params) {
    super(params);

    this.state = {};
  }

  render() {
    console.log("Show Props:");
    console.log(this.props);

    return (
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content style={{backgroundColor: 'black'}}>
          <Text>Show</Text>
        </Content>
      </Container>
    )
  }
}
