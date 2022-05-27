const axios = require('axios').default;
const Constants = require('./constants');

const server = axios.create({
  // @todo is there an .env var that we can use here to determine environment?
   baseURL: Constants.server.dev,
   headers: {
     'Content-type': 'Application/Json'
   }
 });

export const upload = async ({data, contentType}) => {
  let uploadData;
  try {
    uploadData = server.post(`/upload`, { data, contentType });
  } catch (err) {
    console.log(err);
    throw new Error ("There was an error");
  }
  return uploadData;
}

export const sign = async ({ arUrl }) => {
  let signData;
  try {
    signData = server.post(`/sign`, { arUrl });
  } catch (err) {
    console.log(err);
    throw new Error ("There was an error");
  }
  return signData;
}
