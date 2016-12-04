import React, { Component, PropTypes } from 'react';
import { Modal, Platform, ScrollView, Image, InteractionManager, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sickrage';
import * as tvActionCreators from '../../actions/the_tv_db';
import store from 'react-native-simple-store';
import { Container, Header, Content, Radio, Fab, Title, CheckBox, Button, Picker, Icon, Text, Item, Thumbnail, InputGroup, Input, Spinner, List, ListItem, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

class NewShow extends Component {
  constructor(params) {
    super(params);

    this.state = {
      status: 'skipped',
      future_status: 'skipped',
      subtitles: false,
      initial: 'fullhdtv',
      searchString: "",
      id: 0
    };
  }

  _renderRow(result) {
    // console.log("Rendering result: ", result);
    onPress = () => this.setState({ id: result.id })
    return (
      <ListItem onPress={onPress}>
        <Radio selected={this.state.id == result.id} />
        <Text>{result.seriesName}</Text>
      </ListItem>
    )
  }

  render() {
    console.log("New Show Props:");
    console.log(this.props);
    let qualityOptions;
    const qualities = ['sdtv', 'sddvd', 'hdtv', 'rawhdtv', 'fullhdtv', 'hdwebdl', 'fullhdwebdl', 'hdbluray', 'fullhdbluray', 'unknown']
    const onUpdateSubtitles = (value) => this.setState({ subtitles: !this.state.subtitles })
    _submitShow = () => {
      this.props.addNewShow({ status: this.state.status, future_status: this.state.future_status, subtitles: this.state.subtitles, initial: this.state.initial, indexerid: this.state.id })
      setTimeout(Actions.pop, 250);
    }


    qualityOptions = _.map(qualities, quality => {
      return <Picker.Item key={quality} label={_.capitalize(quality)} value={quality} />
    })

    return (
      <Container>
        <Header>
          <Title>Add New Show</Title>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-search" style={{ color: '#0A69FE' }} onPress={() => this.props.searchSeries(this.state.searchString)} />
                <Input
                  inlineLabel
                  label="Find Show"
                  placeholder="Find Show"
                  onChangeText={(text) => this.setState({ searchString: text }) }
                  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <List
                style={{ height: 200 }}
                dataArray={this.props.searchResult}
                renderRow={this._renderRow.bind(this)}
                />
            </ListItem>
            <ListItem>
              <Text>Missing episode status</Text>
              <Picker
                iosHeader="Select"
                mode="dialog"
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
            <ListItem onPress={onUpdateSubtitles}>
              <CheckBox checked={this.state.subtitles} onPress={onUpdateSubtitles} />
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
          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={_submitShow}>
              Add Show
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.the_tv_db.searchResult
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
export default connect(mapStateToProps, _.merge({}, actionCreators, tvActionCreators))(NewShow);
