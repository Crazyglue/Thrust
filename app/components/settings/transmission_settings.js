import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input, List, ListItem, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/transmission';

import offline from 'react-native-simple-store';

class TransmissionSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    }
  }

  ping(){
    console.log("pinging...");
    this.props.pingTransmission();
  }

  setStartPaused() {
    this.props.setStartPaused(!this.props.api.getStartPaused())
    this.forceUpdate();
  }

  render() {
    // console.log("Transmission Settings Props");
    // console.log(this.props);

    return(
      <List>
        <ListItem onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed })}>
          <Row style={{ justifyContent: "space-between"}} >
            <Text style={{ fontSize: 24, lineHeight: 24 }}>Transmission</Text>
            {this.state.isCollapsed ? <Icon name="ios-arrow-down" /> : <Icon name="ios-arrow-up" />}
          </Row>
        </ListItem>
        { !this.state.isCollapsed ? [
          (
            <ListItem key="url">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-wifi' style={{color:'black'}}/>
                <Input
                  placeholder='URL/IP'
                  onChangeText={(localUrl) => this.props.setLocalUrl(localUrl)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.getLocalUrl()}
                  />
              </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="port">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-wifi' style={{color:'black'}}/>
                <Input
                  placeholder='Port'
                  onChangeText={(localPort) => this.props.setLocalPort(localPort)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.getLocalPort()}
                  />
              </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="dir">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-folder' style={{color:'black'}}/>
                <Input
                  placeholder='Download Directory'
                  onChangeText={(dir) => this.props.setDownloadDir(dir)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.getDownloadDir()}
                  />
              </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="paused" onPress={this.setStartPaused.bind(this)}>
              <CheckBox
                checked={this.props.api.startPaused}
                />
              <Text>Add torrents paused</Text>
            </ListItem>
          ),
          (
            <ListItem key="test">
              <Button onPress={this.ping.bind(this)} transparent>
                <Text>Test Connection</Text>
              </Button>
            </ListItem>
          ),
          (
            <ListItem key="stats">
              <Button onPress={() => this.props.getStats()} transparent>
                <Text>Get Stats</Text>
              </Button>
            </ListItem>
          )
        ] : null}
      </List>
    )
  }

}

const mapStateToProps = (state) => {
  // console.log("mapStateToProps:");
  // console.log(state);
  return {
    api: state.transmission.api,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionSettings);
