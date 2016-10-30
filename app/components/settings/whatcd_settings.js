import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, InputGroup, Input, List, ListItem } from 'native-base';
import { LayoutAnimation } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/whatcd';
import { Col, Row, Grid } from 'react-native-easy-grid';

class WhatCDSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: '',
      passwordText: '',
      buttonState: 'Log in',
      isCollapsed: true,
    };
  }

  login() {
    this.props.login();
  }

  componentWillReceiveProps(nextProps) {
    let buttonState = 'idle';
    if(nextProps.isLoggedIn)
      buttonState = 'success';
    if(nextProps.isLoggingIn)
      buttonState = "busy";
    this.setState({ buttonState: buttonState });
  }

  toggleDropdown () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    // console.log("WhatCD Settings props");
    // console.log(this.props);
    // console.log("ButtonState: ");
    // console.log(this.state.buttonState);

    let loginStatus;

    if (this.props.isLoggedIn) {
      loginStatus = <Icon name='ios-checkmark' style={{color: 'green'}}/>
    }
    else
      loginStatus = <Icon name="ios-cancel" style={{color: "red"}} />

    return(
      <List>
        <ListItem onPress={this.toggleDropdown.bind(this)}>
          <Row style={{ justifyContent: "space-between"}}>
            <Text style={{ fontSize: 24, lineHeight: 24 }} >WhatCD</Text>
            {this.state.isCollapsed ? <Icon name="ios-arrow-down" /> : <Icon name="ios-arrow-up" />}
          </Row>
        </ListItem>

        { !this.state.isCollapsed ? [
          (
            <ListItem key="user">
              <InputGroup borderType='underline' style={{margin: 10}}>
                <Icon name='ios-person' style={{color:'black'}}/>
                <Input
                  onSubmitEditing={(usernameText) => this.props.setUsername(usernameText)}
                  placeholder='Username'
                  onChangeText={(usernameText) => this.props.setUsername(usernameText)}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  defaultValue={this.props.username}
                  />
              </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="pass">
            <InputGroup borderType='underline' style={{margin: 10}}>
              <Icon name='ios-key' style={{color:'black'}}/>
              <Input
                onSubmitEditing={(passwordText) => this.props.setPassword(passwordText)}
                placeholder='Password'
                onChangeText={(passwordText) => this.props.setPassword(passwordText)}
                blurOnSubmit={true}
                autoCorrect={false}
                secureTextEntry={true}
                defaultValue={this.props.password}
                />
            </InputGroup>
            </ListItem>
          ),
          (
            <ListItem key="login">
              <Row style={{ justifyContent: "space-between"}}>
                <Button onPress={this.login.bind(this)}>Login</Button>
                {loginStatus}
              </Row>
            </ListItem>
          )] : null }
      </List>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    whatcd: state.whatcd,
    username: state.whatcd.api.username,
    password: state.whatcd.api.password,
    isLoggedIn: state.whatcd.isLoggedIn,
    isLoggingIn: state.whatcd.isLoggingIn,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDSettings);
