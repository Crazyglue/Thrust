import store from 'react-native-simple-store';
import querystring from 'query-string';
import merge from 'lodash/merge'
import RNFetchBlob from 'react-native-fetch-blob'

export default class TheTvDb {
  constructor() {
    console.log("Constructing TV DB API...");
    this.baseUrl = "https://api.thetvdb.com";
    this.apiKey = "E51E1D3EB42F5CE1";
    this.token = "";

    this.loginUrl = "/login";
    this.searchSeriesUrl = '/search/series?';
  }

  getEndpoint() { return this.baseUrl; }
  getAuthorizationHeader() {
    return {
      headers: {
        "Authorization": "Bearer " + this.token
      }
    }
  }

  searchSeries(string) {
    params = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    queryString = querystring.stringify({name: string});
    console.log("queryString", queryString)

    newParams = _.merge({}, params, this.getAuthorizationHeader())
    console.log("newParams", newParams);

    return fetch(this.getEndpoint() + this.searchSeriesUrl + queryString, newParams);
  }

  login() {
    params = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "apikey": this.apiKey
      })
    }

    fetch(this.getEndpoint() + this.loginUrl, params)
      .then(response => {
        // console.log("response:", response);
        if (response.ok && response.status == 200) {
          return response.json()
        }
        else
          console.warn("Cannot get token from The TV DB, check response:", response);
      })
      .then(json => {
        console.log("Setting token:", json.token);
        this.token = json.token;
      })
  }

}
