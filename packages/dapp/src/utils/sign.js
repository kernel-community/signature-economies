const axios = require('axios').default;
const Constants = require('./constants');
const Secrets = require("./secrets.json");

const key = Secrets.arweave.key;
const {protocol, host, port} = Constants.arweave.gateway;
// arweave graphql endpoint
const arweave = axios.create({
  baseURL: protocol + "://" + host + ":" + port,
  headers: {
    'Content-type': 'Application/Json'
  },
});
export const upload = async ({data, contentType, tags}) => {
  if (!data) return;
  if (!tags) tags = [];
  console.log(tags);
  let urls;
  try {
    urls = await uploadToArweave({ data, contentType, tags });
  } catch (err) {
    console.log(err);
    throw new Error ("There was an error");
  }
  // return type: {arUrl: ar://...}
  return { arUrl: urls.arUrl };
}

// upload to arweave
// tags = array of objects
// {key: "", value: ""}
const uploadToArweave = async({ data, contentType, tags }) => {
  if (contentType === 'image/png') {
    data = Buffer.from(data, "base64");
  }

  const tx = await arweave.createTransaction({ data }, key);
  tx.addTag('Content-Type', contentType);

  if (tags.length > 0) {
    tags.forEach((tag) => tx.addTag(tag.key, tag.value))
  }

  await arweave.transactions.sign(tx, key); // returns undefined
  // upload to arweave in chunks (recommended method)
  let uploader = await arweave.transactions.getUploader(tx);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  }
  return {
    id: tx.id,
    arUrl: `ar://${tx.id}`,
    httpsUrl: `https://arweave.net/${tx.id}`
  }
}