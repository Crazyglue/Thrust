/*jshint esversion: 6 */

// import Transmission from 'transmission';

export default class TransmissionRequest {
  constructor() {
    params = {
      host: 'localhost',
      port: 9091,
    };

    // this.transmission = new Transmission(params);
  }

  getActiveTorrents() {
    //return(this.transmission.active());
    return null;
  }
}
