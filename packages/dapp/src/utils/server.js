const axios = require('axios').default;
const Constants = require('./constants');

const server = axios.create({
  // @todo is there an .env var that we can use here to determine environment?
   baseURL: Constants.server.dev,
   headers: {
     'Content-type': 'Application/Json'
   }
 });

export const upload = async ({data, contentType}) => server.post(`/upload`, { data, contentType });

export const sign = async ({ arUrl }) => server.post(`/sign`, { arUrl });

export const next = async() => server.get(`/next`);
