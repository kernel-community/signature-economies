const Arweave = require('arweave');
const Secrets = require("../secrets.json");
const Config = require("../config.json");

const key = Secrets.arweave.key;

const arweave = Arweave.init(Config.arweave.gateway);

// upload to arweave
exports.upload = async({data, contentType}) => {
  if (contentType === 'image/png') {
    data = Buffer.from(data, "base64");
  }
  const tx = await arweave.createTransaction({ data }, key);
  tx.addTag('Content-Type', contentType);
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