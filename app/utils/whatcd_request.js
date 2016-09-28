/*jshint esversion: 6 */

import store from 'react-native-simple-store';

export default class WhatCDRequest {
  constructor(appState) {
    console.log("Constructing WhatCDRequest...");
    this.baseEndpoint = "https://what.cd";
    this.loginEndpoint = "/login.php";
    this.indexEndpoint = "/ajax.php?action=index";
    this.torrentEndpoint = "/ajax.php?action=browse&searchstr=";
    this.userEndpoint = "/ajax.php?action=user&id=";
    this.userSearchEndpoint = "/ajax.php?action=usersearch";

    this.lastResult = null;

    this.login();
  }

  login() {
    console.log("WhatCD Login: ");

    form = new FormData();

    store.get('username').then((uname) => {
      console.log("Setting form username: " + uname);
      form.append('username', uname);
    });
    store.get('password').then((pword) => {
      console.log("Setting form password: " + pword);
      form.append('password', pword);
    });

    form.append('keeplogged', true);

    console.log("FormData: ");
    console.log(form);

    params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: form,
      credentials: 'same-origin'
    };

    fetch(this.baseEndpoint + this.loginEndpoint, params)
      .catch((error) => {
        console.log("Login error!");
        console.log(error);
        console.warn(error);
      })
      .then((response) => {
        if(response)
          console.log("Login successful!");
        else
          console.log("Login failed!");
      })
      .done();
  }

  getTorrent(searchString) {
    var data = '';

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

    return data;
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

}
