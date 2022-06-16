
/**
 * axios object to interact with arlocal
 * eg.,
 * /mine
 * /mint/<address>/<balance>
 */

const axios = require('axios').default;
const Constants = require("../constants");
const { host, port, protocol } = Constants.arweave.gateway;

exports.gateway = axios.create({
  baseURL: `${protocol}://${host}:${port}`,
});
