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

    console.log("Login endpoint: " + endpoint);
    console.log("Logging in using params:");
    console.log(params);

    fetch(endpoint, params)
      .catch((error) => {
        console.log("Login error!");
        console.log(error);
        console.warn(error);
      })
      .then((response) => {
        if(response) {
          console.log("Login successful!");
          store.save("login_data", response)
          .catch((error) => {
            console.warn(error);
          });
          this.getIndex();
        }
        else
          console.log("Login failed!");
      })
      .done();
  }

  getTorrent(searchString) {
    fetch(this.baseEndpoint + this.torrentEndpoint + searchString)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        data = responseJson.response;
        console.log("TORRENT RESULT: ");
        console.log(data);
        store.save('torrent_result', data);
      })
      .catch((error) => {
        console.log(error);
        console.log("FOUND AN ERROR:");
        console.warn(error);
      })
      .done();
  }

  getUser() {
    url = this.baseEndpoint + this.userEndpoint;

    fetch(url, {credentials: 'same-origin'})
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        data = responseJson.response;
        store.save('user_info', data);
        console.log("USER RESPONSE");
        console.log(data);
        return(data);
      })
      .done();
  }

  getIndex() {
    url = this.baseEndpoint + this.indexEndpoint;

    fetch(url, {credentials: 'same-origin'})
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        data = responseJson.response;
        console.log("Saving index data...");
        console.log(data);
        store.save('index_data', data);
      })
      .done();
  }
}
