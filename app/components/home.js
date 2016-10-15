/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, Spinner } from 'native-base';

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
        <Button transparent>
          <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
        </Button>
      )
    }
    else if (this.props.whatcd.isLoggingIn) {
      whatcdSpinner = (
        <Button style={{ height: 20, width: 20 }} transparent>
          <Spinner color="orange" />
        </Button>
      )
    }
    else {
      whatcdSpinner = (
        <Button transparent>
          <Icon name="ios-close" style={{color: "red"}} />
        </Button>
      )
    }


    return (
      <Container>
        <Header>
          {whatcdSpinner}
          <Title>Home</Title>
          <Button transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content>

          <Card>
            <CardItem onPress={goToWhatCD} style={{ height: 50 }}>
              <Thumbnail style={{backgroundColor: 'black'}} source={require('../assets/images/whatcd.png')} size={30} square/>
              <Text>WhatCD</Text>
            </CardItem>
            <CardItem onPress={goToTransmission}>
              <Thumbnail source={require('../assets/images/transmission.png')} size={30} square/>
              <Text>Transmission</Text>
            </CardItem>
            <CardItem onPress={goToMoviePage}>
              <Thumbnail source={require('../assets/images/moviedb.png')} size={30} square/>
              <Text>Movies</Text>
            </CardItem>
            <CardItem onPress={goToAppSettings}>
              <Thumbnail style={{backgroundColor: 'black'}} source={require('../assets/images/whatcd.png')} size={30} square/>
              <Text>App Settings</Text>
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
