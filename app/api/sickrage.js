import store from 'react-native-simple-store';
import querystring from 'query-string';
import merge from 'lodash/merge'
import RNFetchBlob from 'react-native-fetch-blob'

export default class SickRage {
  constructor() {
    console.log("Constructing SickRage API...");
    this.baseUrl = "";
    this.apiKey = "";

    this.actions = {
      shows: {
        index: "shows&sort=name",
        banner: "show.getbanner",
        seasons: "show.seasons",
        poster: "show.getposter",
        addNew: "show.addnew",
      }
    }
    console.log("Sickrage endpoint:", this.baseEndpoint);
  }

  getEndpoint() { return "http://" + this.baseUrl + "/api/" + this.apiKey + "/?cmd="; }

  getShows() { return fetch(this.getEndpoint() + this.actions.shows.index); }
  getSeasons(id) { return fetch(this.getEndpoint() + this.actions.shows.seasons + "&indexerid=" + id); }

  getPoster(id) {
    return RNFetchBlob.config({
      fileCache : true,
      // by adding this option, the temp files will have a file extension
      appendExt : 'jpg'
    }).fetch('GET', this.getEndpoint() + this.actions.shows.poster + "&indexerid=" + id, {})
  }

  }

  getShowBanner(id) {
    // console.log("show banner endpoint:", this.getEndpoint() + this.actions.showBanner + "&indexerid=" + id, {});
    return RNFetchBlob.config({
      fileCache : true,
      // by adding this option, the temp files will have a file extension
      appendExt : 'jpg'
    }).fetch('GET', this.getEndpoint() + this.actions.shows.banner + "&indexerid=" + id, {})
  }

  setUrl(url) { this.baseUrl = url; }
  getUrl() { return this.baseUrl; }

  setApiKey(key) { this.apiKey = key; }
  getApiKey() { return this.apiKey; }

  addNewShow(params) {
    fetch(this.getEndpoint() + this.actions.shows.addNew + params)
  }

}
