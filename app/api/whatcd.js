/*jshint esversion: 6 */

import store from 'react-native-simple-store';
import querystring from 'query-string';

export default class WhatCDAPI {
  constructor() {
    console.log("Constructing WhatCDAPI...");
    this.baseEndpoint = "https://what.cd";
    this.loginEndpoint = "/login.php";
    this.indexEndpoint = "/ajax.php?action=index";
    this.torrentEndpoint = "/ajax.php?action=browse&searchstr=";
    this.userEndpoint = "/ajax.php?action=user&id=";
    this.userSearchEndpoint = "/ajax.php?action=usersearch";
    this.artistEndpoint = '/ajax.php?action=artist';
    this.username = '';
    this.password = '';

    this.downloadEndpoint = '/torrents.php?action=download';
    this.downloadId = '&id=';
    this.authKey = '&authkey=';
    this.passKey = '&torrent_pass=';

    this.defaultHeaders = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };

    console.log("Endpoint: " + this.baseEndpoint + this.loginEndpoint);
  }

  login() {
    let endpoint = this.baseEndpoint + this.loginEndpoint;

    console.log("WhatCD Login: ");

    form = new FormData();

    form.append('username', this.username);
    form.append('password', this.password);
    form.append('keeplogged', true);

    params = {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      },
      body: form,
      credentials: 'same-origin'
    };

    console.log("Logging into whatcd using params:");
    console.log(params);
    console.log(endpoint);

    return fetch(endpoint, params);
  }

  getTorrent(searchString, options) {
    url = this.baseEndpoint + this.torrentEndpoint + searchString + "&group_results=1&" + querystring.stringify(options);

    console.log("Received options:");
    console.log(options);
    console.log("Stringified torrent search options:");
    console.log(querystring.stringify(options));

    console.log("Searching torrents with url:");
    console.log(url);

    return fetch(url);
  }

  getUser() {
    url = this.baseEndpoint + this.userEndpoint;

    return fetch(url, {credentials: 'same-origin'});
  }

  getIndex() {
    url = this.baseEndpoint + this.indexEndpoint;

    return fetch(url, {credentials: 'same-origin'});
  }

  getArtist(searchTerm) {
    console.log("Getting artist");
    url = this.baseEndpoint + this.artistEndpoint + "&artistname=" + searchTerm;

    console.log("URL");
    console.log(url);

    return fetch(url, this.defaultHeaders);
  }

  downloadTorrent(torrentId, authKey, passKey) {
    url = this.baseEndpoint + this.downloadEndpoint + this.downloadId + torrentId + this.authKey + authkey + this.passKey + passkey;
    params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };

    console.log("Downloading torrent using the following params:");
    console.log(url);
    console.log(params);

    return fetch(url, params);
  }

  getDownloadUrl(torrentId, authKey, passKey) {
    url = this.baseEndpoint + this.downloadEndpoint + this.downloadId + torrentId + this.authKey + authkey + this.passKey + passkey;

    return url;
  }

  setUsername(username) { this.username = username; }
  setPassword(password) { this.password = password; }
}
