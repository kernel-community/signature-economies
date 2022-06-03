const Arweave = require('arweave');
const Secrets = require("../secrets.json");
const Config = require("../config.json");
const {ethers} = require("ethers");
const {abis, addresses} = require("../utils/constants");

const chain = Secrets.chain;

const key = Secrets.arweave.key;

const arweave = Arweave.init(Config.arweave.gateway);

// upload to arweave
// tags = array of objects
// {key: "", value: ""}
exports.upload = async({ data, contentType, tags }) => {
  if (contentType === 'image/png') {
    data = Buffer.from(data, "base64");
  }

  const tx = await arweave.createTransaction({ data }, key);
  tx.addTag('Content-Type', contentType);

  if (tags.length > 0) {
    console.log("got tags");
    console.log(tags);
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

// check if a given tokenid exists on the contract
// will return true if token id exists on contract
exports.tokenIdContractCheck = async(id) => {
  const rpc = Secrets.provider[chain].rpc;
  const chainId = Secrets.provider[chain].chainId;
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const address = addresses(chainId).signatureNFT;
  let exists = false;
  const contract = new ethers.Contract(address,abis.signatureNFT, provider);
  try {
    // this will either return or throw
    exists = !!(await contract.ownerOf(id))
  } catch(err) { /** ignore error here */ }
  return exists;
}
