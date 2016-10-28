import React, { Component } from 'react';
import * as actionCreators from '../../actions/whatcd';
import { connect } from 'react-redux';
import WhatCDResult from './whatcd_result';
import { ScrollView } from 'react-native';
import { Content } from 'native-base';
import sortBy from 'lodash/sortBy';

class WhatCDResultList extends Component {
  constructor(params) {
    super(params);
  }

  render() {
    // console.log("WhatCD Result List props:");
    // console.log(this.props);

    let items = [];

    if (this.props.searchResult && this.props.searchResult.results) {
      sortBy(this.props.searchResult.results, 'totalSeeders').reverse().forEach((result) => {
        items.push(
          <WhatCDResult key={result.groupId} data={result} />
        );
      });
    }

    return(
      <Content>
        <ScrollView horizontal={true}>
          {items}
        </ScrollView>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.whatcd.searchResult,
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(WhatCDResultList);