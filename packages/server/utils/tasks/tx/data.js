/**
 * requires --id='' in command line arg
 * logs data stored on that hash on arweave
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
  const data = await arweave.transactions.getData(id);
  console.log(data);
})().catch(e => console.log(e));