const Arweave = require('arweave');
const Secrets = require("../secrets.json");
const Constants = require("../constants");

const key = Secrets.arweave.key;

const arweave = Arweave.init(Constants.arweave.gateway);

// upload to arweave
exports.upload = async({ data, contentType, tags }) => {
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
