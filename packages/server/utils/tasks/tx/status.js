/**
 * requires --id='' in command line arg
 * logs transaction status
 */

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const init = require("../connect");
const arweave = init();

;(async () => {
  if (!argv.id) {
    console.log('usage: --id=TX_ID');
    process.exit();
  }
  const id = argv.id;
  const data = await arweave.transactions.getStatus(id);
  console.log(data);
})().catch(e => console.log(e));