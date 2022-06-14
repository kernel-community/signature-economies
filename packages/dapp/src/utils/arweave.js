const axios = require('axios').default;
const Constants = require('./constants');
const Arweave = require('arweave').default;
const {protocol, host, port} = Constants.arweave.gateway;
const Secrets = require("./secrets.json");
const key = Secrets.arweave.key;

// arweave graphql endpoint
const arweaveQuery = axios.create({
  baseURL: protocol + "://" + host,
  headers: {
    'Content-type': 'Application/Json'
  },
});

// arweave client sdk
const arweaveClient = Arweave.init(Constants.arweave.gateway);

// upload to arweave
// tags = array of objects
// {key: "", value: ""}
export const uploadToArweave = async({ data, contentType, tags }) => {
  if (contentType === 'image/png') {
    data = Buffer.from(data, "base64");
  }

  const tx = await arweaveClient.createTransaction({ data }, key);
  tx.addTag('Content-Type', contentType);

  if (tags.length > 0) {
    tags.forEach((tag) => tx.addTag(tag.key, tag.value))
  }

  await arweaveClient.transactions.sign(tx, key); // returns undefined
  // upload to arweave in chunks (recommended method)
  let uploader = await arweaveClient.transactions.getUploader(tx);
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

export const getAllSignatures = () => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getSignatures
  })
}

export const getTransactionData = async (tx, opts = { decode: true, string: true }) => {
  return arweaveClient.transactions.getData(tx, {...opts})
}


const GET_SIGNATURE_QUERY = `
  query getSignatures($appName: String!, $first: Int) {
    transactions(tags:[
      {
        name:"App-Name",
        values:[$appName],
      },
    ], sort:HEIGHT_DESC, first: $first) {
      edges {
        node {
          id
          block {
            timestamp
          }
        }
      }
    }
  }
`
const VARS = {
  appName: "Kernel-Signature-Economies",
  first: 15
}

const Queries = {
  getSignatures: {
    query: GET_SIGNATURE_QUERY,
    variables: VARS
  }
}

