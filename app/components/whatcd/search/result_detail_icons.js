import React, { Component } from 'react';
import { Text, CardItem } from 'native-base';

export default class ResultDetailIcons extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <CardItem style={{flex: 1}} key="tags">
        <Text style={{fontSize: 12}}>Snatched: {this.props.totalSnatched}</Text>
        <Text style={{fontSize: 12}}>Seeders: {this.props.totalSeeders}</Text>
        <Text style={{fontSize: 12}}>Leechers: {this.props.totalLeechers}</Text>
      </CardItem>
    )
  }
}

ResultDetailIcons.propTypes = {
  totalSnatched: React.PropTypes.number,
  totalLeechers: React.PropTypes.number,
  totalSeeders: React.PropTypes.number
};
