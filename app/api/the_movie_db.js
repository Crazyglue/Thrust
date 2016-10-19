import store from 'react-native-simple-store';

export default class TheMovieDBAPI {
  constructor() {
    console.log("Constructing The Movie DB Request...");

    this.apiKey = "f907bcb4d2c2acc471f7ea8b7ab6b764";
    this.baseEndpoint = "https://api.themoviedb.org/3";
    this.sessionEndpoint = this.baseEndpoint + "/authentication/token/new?api_key=" + this.apiKey;

    this.movieSearchEndpoint = this.baseEndpoint + "/search/movie?api_key=" + this.apiKey;
  }

  search(movieString) {
    console.log("Searching movie: " + movieString);
    params = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    queryString = "&query=" + movieString;

    return fetch(this.movieSearchEndpoint + queryString, params);
  }

}
