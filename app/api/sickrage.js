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
  constructor() {
    console.log("Constructing SickRage API...");
    this.baseUrl = "";
    this.apiKey = "";

    this.showsEndpoint = "shows";
    this.actions = {
      shows: "shows&sort=name",
      showBanner: "show.getbanner"
    }

    this.postJsonHeaders = POST_HEADERS;
    this.postFormHeaders = FORM_HEADERS;

    console.log("Endpoint:", this.baseEndpoint);
  }

  getEndpoint() {
    return "http://" + this.baseUrl + "/api/" + this.apiKey + "/?cmd=";
  }

  getShows() {
    // console.log(this.getEndpoint() + this.actions.shows);
    return fetch(this.getEndpoint() + this.actions.shows);
  }
  getShowBanner(id) {
    // console.log("show banner endpoint:", this.getEndpoint() + this.actions.showBanner + "&indexerid=" + id, {});
    return RNFetchBlob.config({
      fileCache : true,
      // by adding this option, the temp files will have a file extension
      appendExt : 'jpg'
    }).fetch('GET', this.getEndpoint() + this.actions.showBanner + "&indexerid=" + id, {}) }

  setUrl(url) { this.baseUrl = url; }
  getUrl() { return this.baseUrl; }

  setApiKey(key) { this.apiKey = key; }
  getApiKey() { return this.apiKey; }

}
