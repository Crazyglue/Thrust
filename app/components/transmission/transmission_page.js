import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, List, Spinner, Card } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { InteractionManager } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import * as actionCreators from '../../actions/transmission';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import TorrentItem from './torrent_item';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import ModalDropdown from 'react-native-modal-dropdown';

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
      timer.setInterval("transmission_ping", () => {
        this.props.getSessionStats();
        this.props.getTorrentInfo([], this.state.statusFilter);
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

  setStatusFilter(index, value) {
    this.setState({
      statusFilter: index
    });
  }

  render() {
    // console.log("TransmissionPage Props:");
    // console.log(this.props);
    rawTorrents = this.props.transmission.displayTorrents
    torrents = filter(rawTorrents, { 'status': parseInt(this.state.statusFilter) })

    const renderTorrent = (data) => this.renderTorrent(data);
    let placeHolder;

    let displayItem;

    if (this.state.renderPlaceholderOnly)
      displayItem = (<Spinner />)
    else if (this.props.transmission.displayTorrents.length > 0) {
      displayItem = (<List
        dataArray={torrents}
        renderRow={renderTorrent}
        />)
    }
    else
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
          <ModalDropdown
            options={this.props.transmission.api.statusMap}
            onSelect={this.setStatusFilter.bind(this)}
            >
            <Card style={{ alignItems: 'center', width:100, height: 30}}>
              <Text>Choose filter</Text>
            </Card>
          </ModalDropdown>
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
