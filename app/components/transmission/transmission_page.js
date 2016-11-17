import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, List, Spinner, Card } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { InteractionManager } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import TransmissionDropdown from './transmission_dropdown';
import TransmissionTorrentList from './transmission_torrent_list';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';

class TransmissionPage extends Component {
  constructor(params) {
    super(params);

    this.state = {
      renderPlaceholderOnly: true,
      statusFilter: 0
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
      this.props.getTorrentInfo([], this.state.statusFilter);
    });
  }

  render() {
    // console.log("TransmissionPage Props:");
    // console.log(this.props);

    return(
      <Container>
        <Header>
          <Button onPress={Actions.pop} transparent>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>Transmission</Title>
          <Button transparent>
            <MDIcon style={{fontSize: 28}} name='view-list' />
          </Button>
        </Header>
        <Content>
          <TransmissionDropdown
            options={this.props.transmission.api.statusMap}
            sessionStats={this.props.transmission.sessionStats}
            onSelect={(index, value) => this.setState({ statusFilter: index })}
            statusFilter={this.state.statusFilter}
            />

          <TransmissionTorrentList
            torrents={this.props.displayTorrents}
            statusFilter={this.state.statusFilter}
            renderPlaceholder={this.state.renderPlaceholderOnly}
            statusMap={this.props.transmission.api.statusMap}
            />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transmission: state.transmission,
    displayTorrents: state.transmission.displayTorrents,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionPage);
