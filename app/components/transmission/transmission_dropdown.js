import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, List, Spinner, Card } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ModalDropdown from 'react-native-modal-dropdown';
import bytes from 'bytes';

export default class TransmissionDropdown extends Component {

  constructor(params) {
    super(params);
  }

  render() {
    const onSelect = (index, value) => this.props.onSelect(index, value);
    // console.log("onSelect", this.props.onSelect);

    return(
      <Row>
        <ModalDropdown
          options={this.props.options}
          onSelect={this.props.onSelect}
          >
          <Card style={{ alignItems: 'center', width:100, height: 30}}>
            <Text>{this.props.options[this.props.statusFilter]}</Text>
          </Card>
        </ModalDropdown>
        <Text>D: {bytes(this.props.sessionStats.downloadSpeed, {decimalPlaces: 1, unitSeperator: " "})}</Text>
        <Text>U: {bytes(this.props.sessionStats.uploadSpeed, {decimalPlaces: 1, unitSeperator: " "})}</Text>
      </Row>
    );
  }
}
