/**
 * Balance of saved wallet
 */
const {address} = require("../../key.json");
const init = require("../connect");
const arweave = init();

;(async () => {
  const winston = await arweave.wallets.getBalance(address);
  const ar = arweave.ar.winstonToAr(winston);
  console.log('1 AR = 1000000000000 Winston (12 zeros) and 1 Winston = 0.000000000001 AR.');
  console.log('balance in winston:', winston);
  console.log('balance in AR', ar);
})().catch((err) => console.log(err));
