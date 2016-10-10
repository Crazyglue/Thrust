/*jshint esversion: 6 */

export default class TransmissionAPI {
  constructor() {
    this.baseEndpoint = "http://127.0.0.1:9091/transmission/rpc";
    this.sessionId = null;

    this.getSessionId();
  }

  getSessionId() {

    this.sessionId = null;

    fetch(this.baseEndpoint)
      .then((response) => {
          console.log("constructor response");
          console.log(response);
          if (response.ok === false && response.status === 409) {
            console.log("Setting session id: " + response.headers.map['x-transmission-session-id']);
            this.sessionId = response.headers.map['x-transmission-session-id'][0];
          }
        })
        .catch((error) => console.warn(error))
        .done(() => console.log(this.sessionId));
  }

  getTransmissionStats() {
    console.log("Getting transmission stats...");

    url = this.baseEndpoint;

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

    url = this.baseEndpoint;

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
}