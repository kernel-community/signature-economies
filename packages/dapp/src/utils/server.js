const axios = require('axios').default;
const Constants = require('./constants');

const server = axios.create({
  // @todo is there an .env var that we can use here to determine environment?
   baseURL: Constants.server.dev,
   headers: {
     'Content-type': 'Application/Json'
   }
 });

export const upload = async ({data, contentType, tags}) => {
  if (!data) return;
  if (!tags) tags = [];
  console.log(tags);
  let uploadData;
  try {
    uploadData = await server.post(`/upload`, { data, contentType, tags });
  } catch (err) {
    console.log(err);
    throw new Error ("There was an error");
  }
  return uploadData;
}

export const sign = async ({ arUrl }) => {
  let signData;
  try {
    signData = await server.post(`/sign`, { arUrl });
  } catch (err) {
    console.log(err);
    throw new Error ("There was an error");
  }
  return signData;
}
