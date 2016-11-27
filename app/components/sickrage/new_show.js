import React, { Component, PropTypes } from 'react';
import { Modal, Platform, ScrollView, Image, InteractionManager, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sickrage';
import store from 'react-native-simple-store';
import { Container, Header, Content, Fab, Title, CheckBox, Button, Picker, Icon, Text, Item, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

class NewShow extends Component {
  constructor(params) {
    super(params);

    this.state = {
      status: 'skipped',
      future_status: 'skipped',
      subtitles: false,
      initial: 'fullhdtv'
    };
  }

  render() {
    // console.log("SickRage Props:");
    // console.log(this.props);
    let qualityOptions;
    const qualities = ['sdtv', 'sddvd', 'hdtv', 'rawhdtv', 'fullhdtv', 'hdwebdl', 'fullhdwebdl', 'hdbluray', 'fullhdbluray', 'unknown']

    qualityOptions = _.map(qualities, quality => {
      return <Picker.Item key={quality} label={_.capitalize(quality)} value={quality} />
    })

    return (
      <Container>
        <Header>
          <Title>{this.props.title}</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-search" style={{ color: '#0A69FE' }} />
                <Input inlineLabel label="Find Show" />
              </InputGroup>
            </ListItem>
            <ListItem >
              <Text>Missing episode status</Text>
              <Picker
                iosHeader="Select"
                mode="dropdown"
                selectedValue={this.state.status}
                onValueChange={(value) => this.setState({ status: value })}
                >
                <Picker.Item label={"Wanted"} value={"wanted"} />
                <Picker.Item label={"Skipped"} value={"skipped"} />
                <Picker.Item label={"Ignored"} value={"ignored"} />
              </Picker>
            </ListItem>
            <ListItem >
              <Text>Future episode status</Text>
              <Picker
                iosHeader="Select"
                mode="dropdown"
                selectedValue={this.state.future_status}
                onValueChange={(value) => this.setState({ future_status: value })}
                >
                <Picker.Item label={"Wanted"} value={"wanted"} />
                <Picker.Item label={"Skipped"} value={"skipped"} />
                <Picker.Item label={"Ignored"} value={"ignored"} />
              </Picker>
            </ListItem>
            <ListItem onPress={(value) => this.setState({ subtitles: !this.state.subtitles })}>
              <CheckBox checked={this.state.subtitles} onPress={(value) => this.setState({ subtitles: !this.state.subtitles })} />
              <Text>Subtitles</Text>
            </ListItem>
            <ListItem >
              <Text>Default Quality</Text>
              <Picker
                iosHeader="Quality"
                mode="dropdown"
                selectedValue={this.state.initial}
                onValueChange={(value) => this.setState({ initial: value })}
                >
                {qualityOptions}
              </Picker>
            </ListItem>
          </List>
          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
              Add Show
          </Button>
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

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(NewShow);
