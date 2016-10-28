import React, { Component } from 'react';
import { Text, CardItem } from 'native-base';

export default class ResultDetailHeader extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    return (
      <CardItem style={{height: 75}} key="year-type">
          <Text>{this.props.releaseType} ({this.props.groupYear})</Text>
          <Text style={{fontSize: 8, lineHeight: 12}}>{this.props.tags.join(", ")}</Text>
      </CardItem>
    )
  }
}

ResultDetailHeader.propTypes = {
  releaseType: React.PropTypes.string,
  groupYear: React.PropTypes.number,
  tags: React.PropTypes.array
};
