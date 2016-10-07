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
      <View style={{margin: 128}}>
        <TextInput
          style={styles.searchBox}
          onChangeText={(searchText) => this.setState({searchText})}
          value={this.state.searchText}
          />
        <Icon onPress={this.search.bind(this, this.state.searchText)} name="search" />

        <Text>{results}</Text>
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
