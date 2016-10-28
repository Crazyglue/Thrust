import React, { Component } from 'react';
import {
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actionCreators from '../../../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import { Content, Button, Text, Card, CardItem, List, ListItem, Badge, CheckBox, Radio, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import WhatCDTags from '../../../data/whatcd_filters';

const supportedFormats = [
  "Any",
  "MP3",
  "FLAC"
]

class FilterDialog extends Component {
  constructor(params) {
    super(params);

    this.state = {
      activeTags: params.searchOptions.taglist || [],
      selectedFormat: supportedFormats[0],
      freeLeech: true
    };
  }

  addRemoveActiveTag(tag) {
    currentTags = this.state.activeTags;
    if (this.state.activeTags.indexOf(tag) > -1){
      index = this.state.activeTags.indexOf(tag);
      currentTags.splice(index, 1);
    }
    else
      currentTags.push(tag);
    this.setState({activeTags: currentTags});
    this.props.updateSearchOptions({ taglist: currentTags });
  }

  setFormatFilter(format) {
    this.setState({selectedFormat: format})
    this.props.updateSearchOptions({ format: format })
  }

  // TODO:
  // Take into account the other freeleech statuses; "Freeleech", "Neutral leech", etc
  setFreeLeech() {
    this.setState({ freeLeech: !this.state.freeLeech })
    this.props.updateSearchOptions({ freetorrent: !this.state.freeLeech})
  }

  render() {
    // console.log("Filter Dialog Props:");
    // console.log(this.props);

    // console.log("Tag list:");
    // console.log(WhatCDTags.tags);

    badges = [];

    WhatCDTags.tags.forEach((tag) => {
      badges.push(
        <Button key={tag} onPress={() => this.addRemoveActiveTag(tag)} transparent>
          <Badge style={{margin: 5}} primary={this.state.activeTags.indexOf(tag) > -1}>{tag}</Badge>
        </Button>
      );
    })

    let radioButtons = []

    supportedFormats.forEach((format, index) => {
      radioButtons.push(
        <Col key={index}>
          <Radio selected={this.state.selectedFormat == format} onPress={this.setFormatFilter.bind(this, format)} />
          <Text>{format}</Text>
        </Col>
      );
    });

    return(
        <List style={{ backgroundColor: "#CFD8DC", marginTop: 65, marginBottom: 100 }}>
          <ListItem>
            <Row>
              <Col>
                <CheckBox onPress={this.setFreeLeech.bind(this)} checked={this.state.freeLeech} />
                <Text>FreeLeech</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onPress={this.props.closeModal} transparent>
                  <Icon name="ios-close-circle" />
                </Button>
              </Col>
            </Row>
          </ListItem>
          <ListItem>
            <Col size={1}>
              <Text>Format</Text>
            </Col>
            {radioButtons}
          </ListItem>
          <ListItem style={{height: 300}}>
            <Text>Tags:</Text>
            <Content>
            <Row style={{ flexWrap: "wrap" }}>
              {badges}
            </Row>
            </Content>
          </ListItem>
          <ListItem style={{ flexWrap: "wrap" }}>
            <Text>Search Type:</Text>
            <Col>
              <Radio selected={false} />
              <Text>Artist Search</Text>
            </Col>
            <Col>
              <Radio selected={true} />
              <Text>Torrent Search</Text>
            </Col>
          </ListItem>
        </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(FilterDialog);
