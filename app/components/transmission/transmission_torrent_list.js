import React, { Component } from 'react';
import { Container, Header, Content, Title, Button, Icon, Text, List, Spinner, Card } from 'native-base';
import TorrentItem from './torrent_item';
import { InteractionManager } from 'react-native';
import filter from 'lodash/filter';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import * as actionCreators from '../../actions/transmission';
import _ from 'lodash';

class TransmissionTorrentList extends Component {
  constructor(params) {
    super(params);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.getTorrentInfo([], 0);
      timer.setInterval("transmission_ping_torrent_info", () => {
        this.props.getTorrentInfo([], 0);
      }, 5000);
    });
  }

  componentWillUnmount() {
    timer.clearInterval("transmission_ping_torrent_info");
  }

  shouldCompontentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props.torrents, nextProps.torrents) || this.props.statusFilter != nextProps.statusFilter;
  }

  renderTorrent(data) {
    data.status = this.props.statusMap[data.status];
    if (!this.props.renderPlaceholder) {
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
    console.log("Rendering TranssmisionTorrentList");

    rawTorrents = this.props.torrents
    torrents = filter(rawTorrents, { 'status': parseInt(this.props.statusFilter) })

    const renderTorrent = (data) => this.renderTorrent(data);

    if (this.props.renderPlaceholder)
      return (<Spinner />)
    else if (torrents.length == 0)
      return (<Text>No non-seeding torrents.</Text>)
    else {
      return (<List
        dataArray={torrents}
        renderRow={renderTorrent}
        />)
    }

  }
}

const mapStateToProps = (state) => {
  return {
    transmission: state.transmission,
  }
}

export default connect(mapStateToProps, actionCreators)(TransmissionTorrentList);
