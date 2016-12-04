// DO NOT EDIT
const torrentStatusMap = [
    'Stopped', /* Torrent is stopped */
    'Queued', /* Queued to check files */
    'Checking', /* Checking files */
    'Queued for DL', /* Queued to download */
    'Downloading', /* Downloading */
    'Queue to seed', /* Queued to seed */
    'Seeding'  /* Seeding */
];

export default class TransmissionAPI {
  constructor() {
    this.baseEndpoint = "/transmission/rpc";
    this.sessionId = null;
    this.localUrl = '192.168.1.160';
    this.localPort = '9091';
    this.webUrl = '';
    this.webPort = '';
    this.statusMap = torrentStatusMap;
    this.downloadDir = '';
    this.startPaused = true;

    this.username = "";
    this.password = "";
  }

  getSessionId() {
    this.sessionId = null;
    return fetch(this.getBaseUrl());
  }

  getTorrentInfo(ids) {
    url = this.getBaseUrl();

    torrentParams = {
      fields: [
        'rateDownload',
        'rateUpload',
        'status',
        'name',
        'sizeWhenDone',
        'eta',
        'percentDone',
        'leftUntilDone',
      ]
    };


    body = JSON.stringify({
      method: "torrent-get",
      arguments: torrentParams,
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

    return fetch(url, params);
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

  getSessionStats() {
    console.log("Getting session stats...");

    url = this.getBaseUrl();

    body = JSON.stringify({
      method: "session-stats"
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

    return fetch(url, params);
  }

  addTorrent(torrentBlob) {

    url = this.getBaseUrl();

    body = JSON.stringify({
      method: "torrent-add",
      arguments: {
        filename: torrentBlob,
        paused: this.startPaused,
        "download-dir": this.downloadDir
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
  setDownloadDir(dir) { this.downloadDir = dir; }
  setStartPaused(paused) { this.startPaused = paused; }

  getLocalUrl() { return this.localUrl; }
  getLocalPort() { return this.localPort; }
  getDownloadDir() { return this.downloadDir; }
  getStartPaused() { return this.startPaused; }


  parseTorrentStatus(status) {
    return this.statusMap[status];
  }

  getBaseUrl() { return("http://" + this.localUrl + ":" + this.localPort + this.baseEndpoint); }

}
