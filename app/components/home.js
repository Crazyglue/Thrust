/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Home extends Component {
  componentWillMount() {
    this.props.loadOfflineCredentials()
      .then((crendtialsSet) => {
        this.props.login();
      });
    this.props.pingTransmission();

  }

  render() {
    console.log("Home props:");
    console.log(this.props);
    console.log("Home State:");
    console.log(this.props.appState);

    const goToWhatCD = () => Actions.whatcdpage();
    const goToTransmission = () => Actions.transmissionpage();
    const goToMoviePage = () => Actions.moviepage();
    const goToAppSettings = () => Actions.appsettings();

    let whatcdSpinner;

    if (this.props.whatcd.isLoggedIn) {
      whatcdSpinner = (
        <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
      )
    }
    else if (this.props.whatcd.isLoggingIn) {
      whatcdSpinner = (
        <Spinner color="orange" />
      )
    }
    else {
      whatcdSpinner = (
        <Icon name="ios-close" style={{color: "red"}} />
      )
    }


    return (
      <Container>
        <Header>
          <Title>Home</Title>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content>

          <Card>
            <CardItem onPress={goToWhatCD} style={{ height: 50 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail style={{backgroundColor: 'black'}} source={require('../assets/images/whatcd.png')} size={30} square/>
                <Text>WhatCD</Text>
                <Button style={{ height: 20, width: 20 }} transparent>
                  {whatcdSpinner}
                </Button>
              </Row>
            </CardItem>
            <CardItem onPress={goToTransmission}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/transmission.png')} size={30} square/>
                <Text>Transmission</Text>
                <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
              </Row>
            </CardItem>
            <CardItem onPress={goToMoviePage}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/moviedb.png')} size={30} square/>
                <Text>Movies</Text>
                <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
              </Row>
            </CardItem>
            <CardItem onPress={goToAppSettings}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail style={{backgroundColor: 'black'}} source={require('../assets/images/whatcd.png')} size={30} square/>
                <Text>App Settings</Text>
                <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
              </Row>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state,
    whatcd: state.whatcd,
    username: state.whatcd.username,
    password: state.whatcd.password,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(Home);
