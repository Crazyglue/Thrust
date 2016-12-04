import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { Container, Header, Content, Title, Button, Icon, Text, Card, CardItem, Thumbnail, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Drawer from 'react-native-drawer'
import theme from '../themes/thrust';
import moment from 'moment';

class Home extends Component {
  componentWillMount() {
    this.props.loadOfflineCredentials()
      // Login to WhatCD (now dead)
      //
      // .then((crendtialsSet) => {
      //   this.props.login();
      // })
      .then(() => {
        this.props.pingTransmission();
      })
      .then(() => {
        if (this.props.sickrage.lastUpdate.add(30, 'minutes') > moment()) {
          this.props.getShows();
        }

        console.log("lastUpdate", this.props.sickrage.lastUpdate);
      })
      .then(() => {
        this.props.login()
      })

  }

  render() {
    // console.log("Home props:");
    // console.log(this.props);

    const goToWhatCD = () => Actions.whatcdpage();
    const goToTransmission = () => Actions.transmissionpage();
    const goToSickRage = () => Actions.sickrage();
    const goToAppSettings = () => Actions.appsettings();
    const goToTheTvDb = () => Actions.the_tv_db();
    const openDrawer = () => this._drawer.open()
    const closeDrawer = () => this._drawer.close()

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

            <CardItem onPress={goToTransmission}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/transmission.png')} size={30} square/>
                <Text>Transmission</Text>
                <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
              </Row>
            </CardItem>

            <CardItem onPress={goToSickRage}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/sickrage.png')} size={30} square/>
                <Text>SickRage</Text>
                <Icon name="ios-checkmark" style={{fontSize: 36, color: 'green' }} />
              </Row>
            </CardItem>

            <CardItem onPress={goToTheTvDb}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Thumbnail source={require('../assets/images/default.jpg')} size={30} square/>
                <Text>The Tv Db</Text>
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
    sickrage: state.sickrage,
    the_tv_db: state.the_tv_db
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(Home);
