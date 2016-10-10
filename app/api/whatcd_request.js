/*jshint esversion: 6 */

import store from 'react-native-simple-store';

export default class WhatCDRequest {
  constructor() {
    console.log("Constructing WhatCDRequest...");
    this.baseEndpoint = "https://what.cd";
    this.loginEndpoint = "/login.php";
    this.indexEndpoint = "/ajax.php?action=index";
    this.torrentEndpoint = "/ajax.php?action=browse&searchstr=";
    this.userEndpoint = "/ajax.php?action=user&id=";
    this.userSearchEndpoint = "/ajax.php?action=usersearch";

    this.downloadEndpoint = '/torrents.php?action=download';
    this.downloadId = '&id=';
    this.authKey = '&authkey=';
    this.passKey = '&torrent_pass=';

    console.log("Endpoint: " + this.baseEndpoint + this.loginEndpoint);
  }

  login() {
    let endpoint = this.baseEndpoint + this.loginEndpoint;

    console.log("WhatCD Login: ");

    form = new FormData();

    store.get('username').then((uname) => {
      form.append('username', uname);
    });
    store.get('password').then((pword) => {
      form.append('password', pword);
    });

    form.append('keeplogged', true);

    params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: form,
      credentials: 'same-origin'
    };

    console.log("Logging into whatcd using params:");
    console.log(params);

    return fetch(endpoint, params);
  }

  getTorrent(searchString) {
    return fetch(this.baseEndpoint + this.torrentEndpoint + searchString);
  }

  getUser() {
    url = this.baseEndpoint + this.userEndpoint;

    return fetch(url, {credentials: 'same-origin'});
  }

  getIndex() {
    url = this.baseEndpoint + this.indexEndpoint;

    return fetch(url, {credentials: 'same-origin'});
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
}
