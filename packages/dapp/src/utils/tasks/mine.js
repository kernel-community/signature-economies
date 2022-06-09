/**
 * Fund the saved wallet on arlocal
 */
 const axios = require('axios').default;
 const Constants = require("../constants");

 const {protocol, host, port} = Constants.arweave.gateway;

 const arweave = axios.create({
  baseURL: protocol + "://" + host + ":" + port,
  headers: {
    'Content-type': 'Application/Json'
  },
});

 ;(async () => {
   await arweave.get(`/mine`);
 })().catch((err) => console.log(err));
