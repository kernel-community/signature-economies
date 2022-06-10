/**
 * Generates a random wallet & saves in a file
 */
const Arweave = require('arweave');
const fs = require('fs');
const path = require('path');
const Constants = require('../constants');

const arweave = Arweave.init(Constants.arweave.gateway);
const keyPath = path.join(__dirname, ".." , "secrets.json");

;(async () => {
  const key = await arweave.wallets.generate();
  const address = await arweave.wallets.jwkToAddress(key);
  const exists = await fs.existsSync(keyPath);
  let secrets;

  if (exists) {
    secrets = JSON.parse(await fs.readFileSync(keyPath, "utf-8"));
    Object.assign(secrets, {arweave: { key, address }});
  } else {
    secrets = {arweave: { key, address }}
  }

  await fs.writeFileSync(keyPath, JSON.stringify(secrets));
  console.log(address);
})();