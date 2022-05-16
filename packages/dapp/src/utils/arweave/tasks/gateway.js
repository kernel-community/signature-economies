/**
 * axios object to interact with arlocal
 * eg.,
 * /mine
 * /mint/<address>/<balance>
 */

const axios = require('axios').default;

exports.gateway = axios.create({
  baseURL: "http://localhost:1984",
});
