/**
 * Generates a random wallet & saves in a file
 */

const init = require("../connect");
const fs = require('fs');
const path = require('path');

const arweave = init();
const keyPath = path.join(__dirname,"..", "key.json");

;(async () => {
  const key = await arweave.wallets.generate();
  const address = await arweave.wallets.jwkToAddress(key);
  await fs.writeFileSync(keyPath, JSON.stringify({key, address}));
  console.log(address);
})();
