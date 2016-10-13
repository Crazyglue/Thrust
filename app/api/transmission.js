/*jshint esversion: 6 */

export default class TransmissionAPI {
  constructor() {
    this.baseEndpoint = "/transmission/rpc";
    this.sessionId = null;
    this.localUrl = '127.0.0.1';
    this.localPort = '9091';
    this.webUrl = '';
    this.webPort = '';
  }

  getSessionId() {

    this.sessionId = null;

    return fetch(this.getBaseUrl());
  }

  getTransmissionStats() {
    console.log("Getting transmission stats...");

    url = this.getBaseUrl();

    body = JSON.stringify({
      method: "session-get"
    });

    params = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-transmission-session-id": this.sessionId
      },
      body: body
    };

    console.log("params:");
    console.log(params);

    return fetch(url, params);
  }

  addTorrent(torrentBlob) {

    url = this.getBaseUrl();

    body = JSON.stringify({
      method: "torrent-add",
      arguments: {
        filename: torrentBlob,
        paused: true,
      }
    });

    params = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-transmission-session-id": this.sessionId
      },
      body: body
    };

    console.log("Adding torrent with params:");
    console.log(url);
    console.log(params);

    return fetch(url, params);
  }

  setLocalUrl(url) { this.localUrl = url; }
  setLocalPort(port) { this.localPort = port; }
  setWebUrl(url) { this.webUrl = url; }
  setWebPort(port) { this.webPort = port; }
  setSessionId(id) { this.sessionId = id; }

  getBaseUrl() { return("http://" + this.localUrl + ":" + this.localPort + this.baseEndpoint); }

}
