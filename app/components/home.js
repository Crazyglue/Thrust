import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Drawer from 'react-native-drawer'
import theme from '../themes/thrust';

class Home extends Component {
  componentWillMount() {
    this.props.loadOfflineCredentials()
      .then((crendtialsSet) => {
        this.props.login();
      })
      .then(() => {
        this.props.pingTransmission();
      });

  }

  render() {
    // console.log("Home props:");
    // console.log(this.props);
    // console.log("Home State:");
    // console.log(this.props.appState);

    const goToWhatCD = () => Actions.whatcdpage();
    const goToTransmission = () => Actions.transmissionpage();
    const goToAppSettings = () => Actions.appsettings();
    const openDrawer = () => this._drawer.open()
    const closeDrawer = () => this._drawer.close()

    let whatcdSpinner;

    if (this.props.whatcd.isLoggedIn) {
      whatcdSpinner = (
        <Icon name="ios-checkmark" style={{ fontSize: 36, color: 'green' }} />
      )
    }
    else if (this.props.whatcd.isLoggingIn) {
      whatcdSpinner = (
        <Icon name="ios-information-outline" style={{ fontSize: 36 }} />
      )
    }
    else {
      whatcdSpinner = (
        <Icon name="ios-close" style={{fontSize: 36, color: "red"}} />
      )
    }

    let content;
    content = (<View style={{backgroundColor: "black", marginTop: 20, width: 200}}><Text style={{color: "white"}}>Hello</Text><Button onPress={closeDrawer} primary>Close</Button></View>);


    return (
      <Drawer
        type="displace"
        side="right"
        tapToClose={true}
        openDrawerOffset={200}
        tweenHandler={Drawer.tweenPresets.parallax}
        ref={(ref) => this._drawer = ref}
        content={content}
        style={{drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},main: {paddingLeft: 3},}}
        >
      <Container theme={theme}>
        <Header>
          <Button transparent>
            {""}
          </Button>
          <Title>Home</Title>
          <Button onPress={openDrawer} transparent>
            <Icon name='ios-menu' />
          </Button>
        </Header>
        <Content>

          <Card>

            <CardItem onPress={goToWhatCD} style={{ height: 50 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail style={{backgroundColor: 'black'}} source={require('../assets/images/whatcd.png')} size={30} square/>
                <Text>WhatCD</Text>
                {whatcdSpinner}
              </Row>
            </CardItem>

            <CardItem onPress={goToTransmission}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/transmission.png')} size={30} square/>
                <Text>Transmission</Text>
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
      </Drawer>
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
