/*jshint esversion: 6 */

import store from 'react-native-simple-store';

export default class TheMovieDBRequest {
  constructor() {
    console.log("Constructing WhatCDRequest...");

    this.apiKey = "f907bcb4d2c2acc471f7ea8b7ab6b764";
    this.baseEndpoint = "https://api.themoviedb.org/3";
    this.sessionEndpoint = this.baseEndpoint + "/authentication/token/new?api_key=" + this.apiKey;

    this.movieSearchEndpoint = this.baseEndpoint + "/search/movie?api_key=" + this.apiKey;

  }

  search(movieString) {
    form = new FormData();

    form.append("query", movieString);

    params = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: form,
      credentials: 'same-origin'
    };

    fetch(this.movieSearchEndpoint, params)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Movie search results:");
        console.log(responseData);
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  }

}
