import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, List, Spinner } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { InteractionManager } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import TorrentItem from './torrent_item';
import isEqual from 'lodash/isEqual'

class TransmissionPage extends Component {
  constructor(params) {
    super(params);

    this.state = {
      renderPlaceholderOnly: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
      this.props.getTorrentInfo([]);
      timer.setInterval("transmission_ping", () => {
        this.props.getTorrentInfo([]);
      }, 3000);
    });
  }

  componentWillUnmount() {
    timer.clearInterval("transmission_ping");
  }

  getStats() {
    this.props.getStats();
  }

  renderTorrent(data) {
    data.status = this.props.transmission.api.parseTorrentStatus(data.status);
    if (!this.state.renderPlaceholderOnly) {
      return (
        <TorrentItem
          data={data}
        />
      )
    } else {
      return null;
    }
  }

  render() {
    // console.log("TransmissionPage Props:");
    // console.log(this.props);

    const renderTorrent = (data) => this.renderTorrent(data);
    let placeHolder;

    if (this.state.renderPlaceholderOnly)
      placeHolder = (<Spinner />)


    let displayItem;
    if (this.props.transmission.displayTorrents.length > 0) {
      displayItem = (<List
        dataArray={this.props.transmission.displayTorrents}
        renderRow={renderTorrent}
        />)
      }
    else if (!this.state.renderPlaceholderOnly)
      displayItem = (<Text>No non-seeding torrents.</Text>)

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
          {placeHolder}
          {displayItem}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transmission: state.transmission,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(TransmissionPage);
