/**
 * Fund the saved wallet on arlocal
 */
const {address} = require("../../key.json");
const {gateway} = require("../gateway");

// 1 AR = 1000000000000 Winston (12 zeros)
const amount = 1000000000000 * 100; // in winston

;(async () => {
  const r = await gateway.get(`/mint/${address}/${amount}`);
  await gateway.get(`/mine`);
  console.log({
    status: r.status,
    data: r.data
  })
})().catch((err) => console.log(err));
