/**
 * Connects with an arweave gateway
 * returns the arweave init function
 */

const Arweave = require('arweave');
const Config = require('../config.json');
const arweave = () => Arweave.init(Config.gateway);

module.exports = arweave
