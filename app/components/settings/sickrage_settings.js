import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input, List, ListItem, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sickrage';

import offline from 'react-native-simple-store';

class SickrageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    }
  }

  render() {
    // console.log("Transmission Settings Props");
    // console.log(this.props);

    return(
      <List>
        <ListItem onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed })}>
          <Row style={{ justifyContent: "space-between"}} >
            <Text style={{ fontSize: 24, lineHeight: 24 }}>SickRage</Text>
            {this.state.isCollapsed ? <Icon name="ios-arrow-down" /> : <Icon name="ios-arrow-up" />}
          </Row>
        </ListItem>
        { !this.state.isCollapsed ? [
          (
            <ListItem key="url">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-wifi' style={{color:'black'}}/>
                <Input
                  placeholder='URL:IP'
                  onChangeText={(url) => this.props.setSickrageUrl(url)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.getUrl()}
                  />
              </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="api-key">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-key' style={{color:'black'}}/>
                <Input
                  placeholder='API key'
                  onChangeText={(apiKey) => this.props.setSickrageApiKey(apiKey)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.api.getApiKey()}
                  />
              </InputGroup>
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
    api: state.sickrage.api,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(SickrageSettings);
