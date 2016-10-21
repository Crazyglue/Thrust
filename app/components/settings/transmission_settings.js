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
  }

  ping(){
    console.log("pinging...");
    this.props.pingTransmission();
  }

  render() {
    // console.log("Transmission Settings Props");
    // console.log(this.props);

    return(
      <Row>
        <Col>
          <List>
            <ListItem>
              <Text>Transmission:</Text>
            </ListItem>
            <ListItem>
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-wifi' style={{color:'black'}}/>
                <Input
                  placeholder='URL/IP'
                  onChangeText={(localUrl) => this.props.setLocalUrl(localUrl)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.localUrl}
                  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-wifi' style={{color:'black'}}/>
                <Input
                  placeholder='Port'
                  onChangeText={(localPort) => this.props.setLocalPort(localPort)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.localPort}
                  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Button onPress={this.ping.bind(this)} transparent>
                <Text>Test Connection</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button onPress={() => this.props.getStats()} transparent>
                <Text>Get Stats</Text>
              </Button>
            </ListItem>
          </List>
        </Col>
      </Row>
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
