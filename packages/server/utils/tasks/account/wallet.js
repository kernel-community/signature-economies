/**
 * Generates a random wallet & saves in a file
 */

const init = require("../connect");
const fs = require('fs');
const path = require('path');

const arweave = init();
const keyPath = path.join(__dirname, ".." ,"..", "..", "secrets.json");

;(async () => {
  const key = await arweave.wallets.generate();
  const address = await arweave.wallets.jwkToAddress(key);
  const secrets = JSON.parse(await fs.readFileSync(keyPath, "utf-8"));
  Object.assign(secrets, {arweave: { key, address }});
  await fs.writeFileSync(keyPath, JSON.stringify(secrets));
  console.log(address);
})();
