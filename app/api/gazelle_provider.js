/*jshint esversion: 6 */

import store from 'react-native-simple-store';
import querystring from 'query-string';
import merge from 'lodash/merge'

export default class GazelleProvider {
  constructor(baseUrl) {
    console.log("Constructing GazelleProvider...");
    this.baseEndpoint = baseUrl;
    this.loginEndpoint = "/login.php";
    this.indexEndpoint = "/ajax.php?action=index";
    this.torrentEndpoint = "/ajax.php?action=browse&searchstr=";
    this.userEndpoint = "/ajax.php?action=user&";
    this.userSearchEndpoint = "/ajax.php?action=usersearch";
    this.topTenEndpoint = '/ajax.php?action=top10';
    this.messagesEndpoint = '/ajax.php?action=inbox';
    this.userSearchEndpoint = '/ajax.php?action=usersearch';
    this.requestsEndpoint = '/ajax.php?action=requests&search='; // <searchterm>&page=<page>&tag=<tags>'
    this.bookmarksEndpoint = '/ajax.php?action=bookmarks&type='; // either: torrents or artists
    this.username = '';
    this.password = '';

    this.downloadEndpoint = '/torrents.php?action=download';
    this.authKey = '&authkey=';
    this.passKey = '&torrent_pass=';

    this.postJsonHeaders = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };

    this.postFormHeaders = {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      },
      credentials: 'same-origin'
    };

    console.log("Endpoint: " + this.baseEndpoint + this.loginEndpoint);
  }

  login() {
    let endpoint = this.baseEndpoint + this.loginEndpoint;

    console.log("Gazelle Login: ");

    form = new FormData();
    form.append('username', this.username);
    form.append('password', this.password);
    form.append('keeplogged', true);

    console.log("Merged params:")
    console.log(merge({body: form}, this.postFormHeaders));

    params = merge({body: form}, this.postFormHeaders);

    console.log("Logging into gazelle platform using params:");
    console.log(params);
    console.log(endpoint);

    return fetch(endpoint, params);
  }

  // search for a torrent
  searchTorrent(searchString, options) {
    url = this.baseEndpoint + this.torrentEndpoint + searchString + "&group_results=1&" + querystring.stringify(options);

    console.log("Received options:");
    console.log(options);
    console.log("Stringified torrent search options:");
    console.log(querystring.stringify(options));

    console.log("Searching torrents with url:");
    console.log(url);

    return fetch(url);
  }

  // options = {
  //   id: 1337
  // }
  getUserStats(options) {
    url = this.baseEndpoint + this.userEndpoint + querystring.stringify(options);

    return fetch(url, { credentials: 'same-origin' });
  }

  // The logged in user's stats. Returns authkey, passkey, etc
  getIndex() {
    url = this.baseEndpoint + this.indexEndpoint;

    return fetch(url, { credentials: 'same-origin' });
  }

  downloadTorrent(torrentId, authKey, passKey) {
    url = getDownloadUrl(torrentId, authKey, passKey);
    params = this.postJsonHeaders

    console.log("Downloading torrent using the following params:");
    console.log(url);
    console.log(params);

    return fetch(url, params);
  }

  getDownloadUrl(torrentId, authKey, passKey) { return this.baseEndpoint + this.downloadEndpoint + '&id=' + torrentId + this.authKey + authkey + this.passKey + passkey; }
  setUsername(username) { this.username = username; }
  setPassword(password) { this.password = password; }
}
