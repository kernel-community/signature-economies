/**
 * Fund the saved wallet on arlocal
 */
 const axios = require('axios').default;

 const Secrets = require("../secrets.json");
 const Constants = require("../constants");

 const address = Secrets.arweave.address;
 const {protocol, host, port} = Constants.arweave.gateway;

 const arweave = axios.create({
  baseURL: protocol + "://" + host + ":" + port,
  headers: {
    'Content-type': 'Application/Json'
  },
});

 // 1 AR = 1000000000000 Winston (12 zeros)
 const amount = 1000000000000 * 100; // in winston

 ;(async () => {
   const r = await arweave.get(`/mint/${address}/${amount}`);
   await arweave.get(`/mine`);
   console.log({
     status: r.status,
     data: r.data
   })
 })().catch((err) => console.log(err));
 