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
import styles from '../stylesheets/default';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/movie';
import Spinner from 'react-native-loading-spinner-overlay';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GiftedListView from 'react-native-gifted-listview';
import MovieResultList from './movies/result_list';


class MoviePage extends Component {
  constructor(props) {
    super(props);

    const movieEndpoint = "";
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      searchText: "",
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchResult.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.searchResult.results)
      });
    }
  }

  search(searchText) {
    this.props.searchMovie(searchText);
  }

  _renderRowView(rowData) {
    console.log("_renderRowView");
    console.log(rowData);

    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='#c8c7cc'
        onPress={() => this._onPress(rowData)}
      >
        <Text>{rowData}</Text>
      </TouchableHighlight>
    );
  }

  _onFetch(page = 1, callback, options) {

    console.log("_onFetch():")
    console.log(this.props.movie.lastSearchResult);
    if (this.props.movie.lastSearchResult.length > 0){
      var rows = this.props.movie.lastSearchResult.results.map((movie) => {
        return movie.title;
      });
      callback(rows);
    }
  }

  _onPress(rowData) {
    console.log(rowData+' pressed');
  }

  render() {
    console.log("Props:");
    console.log(this.props);
    console.log("Store:");
    console.log(this.props.component);

    let results;

    if(this.props.movie.lastSearchResult) {
      console.log("Movies:");
      results = [];
      this.props.movie.lastSearchResult.results.forEach((movie) => {
        console.log(movie.title);
        results.push(movie.title + "\n");
      });
      console.log(results);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome!</Text>
          <Fumi
            style={{alignSelf: 'stretch'}}
            label={'Search'}
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={'blue'}
            autoCorrect={false}
            inputStyle={{ color: '#db786d' }}


            blurOnSubmit={true}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            />

        <MovieResultList data={this.props.movie.lastSearchResult.results} />

        <View>
          <Text style={{ color: "grey" }}>{results}</Text>
        </View>
        <Spinner visible={this.props.movie.isSearching} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie
  }
}

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, actionCreators)(MoviePage);
