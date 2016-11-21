import store from 'react-native-simple-store';
import querystring from 'query-string';
import merge from 'lodash/merge'
import RNFetchBlob from 'react-native-fetch-blob'

const POST_HEADERS = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const FORM_HEADERS = {
  method: 'POST',
  headers: {
    'Accept': 'multipart/form-data',
    'Content-Type': 'multipart/form-data'
  },
  credentials: 'same-origin'
};

export default class SickRage {
  constructor(baseUrl, apiKey) {
    console.log("Constructing SickRage API...");
    this.baseEndpoint = "http://" + baseUrl + "/api/" + apiKey + "/?cmd=";
    this.showsEndpoint = "shows";
    this.actions = {
      shows: "shows",
      showBanner: "show.getbanner"
    }

    this.postJsonHeaders = POST_HEADERS;
    this.postFormHeaders = FORM_HEADERS;

    console.log("Endpoint:", this.baseEndpoint);
  }

  getShows() { return fetch(this.baseEndpoint + this.actions.shows); }
  getShowBanner(id) {
    return RNFetchBlob.config({
      fileCache : true,
      // by adding this option, the temp files will have a file extension
      appendExt : 'png'
    }).fetch('GET', this.baseEndpoint + this.actions.showBanner + "&indexerid=" + id, {}) }
}
