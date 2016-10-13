/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

import offline from 'react-native-simple-store';

class TransmissionSettings extends Component {
  constructor(props) {
    super(props);
  }

  ping(){
    console.log("pinging...");
    this.props.ping();
  }

  render() {
    console.log("Transmission Settings Props");
    console.log(this.props);

    return(
      <Row>
        <Col>
          <Text>Transmission:</Text>
          <InputGroup borderType='underline' style={{margin: 10}}>
            <Icon name='ios-wifi' style={{color:'black'}}/>
            <Input
              onSubmitEditing={(localUrl) => this.props.setLocalUrl(localUrl)}
              placeholder='LAN url'
              onChangeText={(localUrl) => this.props.setLocalUrl(localUrl)}
              blurOnSubmit={true}
              autoCorrect={false}
              defaultValue={this.props.api.localUrl}
              />
          </InputGroup>
          <InputGroup borderType='underline' style={{margin: 10}}>
            <Icon name='ios-wifi' style={{color:'black'}}/>
            <Input
              onSubmitEditing={(localPort) => this.props.setLocalPort(localPort)}
              placeholder='LAN port'
              onChangeText={(localPort) => this.props.setLocalPort(localPort)}
              blurOnSubmit={true}
              autoCorrect={false}
              defaultValue={this.props.api.localPort}
              />
          </InputGroup>
          <Button onPress={this.props.pingTransmission} transparent>Test Connection</Button>
        </Col>
      </Row>
    )
  }

}

const mapStateToProps = (state) => {
  console.log("mapStateToProps:");
  console.log(state);
  return {
    api: state.transmission.api,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionSettings);
