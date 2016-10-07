/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../stylesheets/default';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/movie';
import Spinner from 'react-native-loading-spinner-overlay';

class MoviePage extends Component {
  constructor(props) {
    super(props);

    const movieEndpoint = "";

    this.state = { searchText: "" };
  }

  search(searchText) {
    this.props.searchMovie(searchText);
  }

  render() {
    console.log("Props:");
    console.log(this.props);
    let results;

    if(this.props.movie.lastSearchResult) {
      console.log("Movies:");
      results = [];
      this.props.movie.lastSearchResult.results.forEach((movie) => {
        console.log(movie.title);
        // <Text>{movie.title}</Text>
        // return React.createElement(Text, null, movie.title);

        //return React.createFactory(Text)({}, movie.title);
        results.push(movie.title);
      });
      console.log(results);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome!</Text>
        <View style={styles.inlineSearch}>
          <TextInput
            style={styles.searchBox}
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}
            />
          <Icon style={styles.searchIcon} onPress={this.search.bind(this, this.state.searchText)} name="search" />

        </View>
        <View>
          <Text>{results}</Text>
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
