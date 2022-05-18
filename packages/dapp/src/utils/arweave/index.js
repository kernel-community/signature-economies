import Arweave from 'arweave';
import Key from "./key.json";
import Config from "./config.json";
const key = Key.key;

const arweave = Arweave.init(Config.gateway);

export const upload = async({data, contentType}) => {
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