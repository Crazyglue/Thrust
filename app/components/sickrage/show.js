import React, { Component } from 'react';
import { Image } from 'react-native';
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
        <Content>
          <Text>Show</Text>
          <Image source={{uri: this.props.show.image}} style={{ width: 758/2.2, height: 140/2.2 }} />
          <Text>{this.props.show.show_name}</Text>
          <Text>{this.props.show.status}</Text>
        </Content>
      </Container>
    )
  }
}
