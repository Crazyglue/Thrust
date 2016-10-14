/*jshint esversion: 6 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import { Content, Text, Card, CardItem, List, ListItem, Badge, CheckBox, Radio } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

class FilterDialog extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    console.log("Filter Dialog Props:");
    console.log(this.props);

    // TODO:
    // - Compile a list of tags that will be programatically rendered as badges.
    // -

    return(
        <List>
          <ListItem>
            <Row>
              <Col>
                <CheckBox checked={true} />
                <Text>FreeLeech</Text>
              </Col>
              <Col>
                <CheckBox checked={true} />
                <Text>FreeLeech</Text>
              </Col>
            </Row>
          </ListItem>
          <ListItem>
            <Col size={1}>
              <Text>Format</Text>
            </Col>
            <Col>
              <Radio selected={true} />
              <Text>MP3 V0</Text>
            </Col>
            <Col>
              <Radio selected={false} />
              <Text>FLAC</Text>
            </Col>
            <Col>
              <Radio selected={false} />
              <Text>MP3 320</Text>
            </Col>
          </ListItem>
          <ListItem>
            <Text>Tags:</Text>
            <Row style={{ flexWrap: "wrap" }}>
              <Badge primary>EDM</Badge>
              <Badge>Post-Rock</Badge>
              <Badge>Ambient</Badge>
              <Badge>Instrumental</Badge>
              <Badge>Hip-Hop</Badge>
              <Badge>Rap</Badge>
              <Badge>Psychedelic</Badge>
            </Row>
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
