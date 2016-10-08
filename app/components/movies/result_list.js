/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GiftedListView from 'react-native-gifted-listview';
import { StyleSheet } from 'react-native';
import ResultListRow from './result_list_row';

export default class MovieResultList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log("Props.data:");
    console.log(props.data);

    let data = [];
    if (props.data > 0) {
      console.log(props.data);
      data = props.data.map((data) => {
        console.log("Setting movie:" + data.title);
        return data.title;
      });
    }

    console.log("Data generated:");
    console.log(data);

    this.state = {
      dataSource: ds
    };
  }

  render() {
    data = this.state.dataSource;
    console.log("dataSource:");
    console.log(data);



    console.log("MovieResultList Props:");
    console.log(this.props);
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={(data) => <ResultListRow {...data} />}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
