/**
 * axios object to interact with arlocal
 * eg.,
 * /mine
 * /mint/<address>/<balance>
 */

const axios = require('axios').default;
const Config = require("../../config.json");

const { host, port, protocol } = Config.arweave.gateway;

exports.gateway = axios.create({
  baseURL: `${protocol}://${host}:${port}`,
});
