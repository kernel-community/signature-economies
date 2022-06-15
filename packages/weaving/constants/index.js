const { abis } = require("./abi.js");
const { addresses } = require("./addresses");
const { arweave } = require("./arweave");
const PORT = 8080;

module.exports = {
  addresses,
  abis,
  arweave,
  port: PORT
}
