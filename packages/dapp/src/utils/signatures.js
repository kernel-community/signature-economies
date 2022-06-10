const { ethers } = require('ethers');
const axios = require('axios').default;
const Constants = require('./constants');
const Arweave = require('arweave').default;
const {protocol, host, port} = Constants.arweave.gateway;
const Secrets = require("./secrets.json");

// arweave graphql endpoint
const arweave = axios.create({
   baseURL: protocol + "://" + host + ":" + port,
   headers: {
     'Content-type': 'Application/Json'
   },
});

// arweave client sdk
const arweaveClient = Arweave.init(Constants.arweave.gateway);

const QUERY = `
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

const cleanResponse = async (data) => {
  const { data: { transactions: { edges } } } = data;
  const transactionIds = edges.map(edge => {
    let date;
    if (edge.node.block) {
      const epoch = edge.node.block.timestamp * 1000;
      date = new Date(epoch);
    }
    return {
      id: edge.node.id, // arweave tx id
      date: date ? date.toLocaleDateString(): undefined // block.timestamp
    }
  });
  const txDataPromises = transactionIds.map((tx) => arweaveClient.transactions.getData(tx.id, {decode: true, string: true}));
  const txData = await Promise.all(txDataPromises);
  const response = transactionIds.map((tx, index) => {
    return {
      id: tx.id, // arweave transaction id
      date: tx.date, // arweave transaction block timestamp
      data: JSON.parse(txData[index]) // {account, signature}
    }
  })
  return response;
}

// returns an array of {id: arweave tx, signature}
export const get = async () => {
  const r = await arweave.post('/graphql', {
    query: QUERY,
    variables: VARS
  })
  let responses = await cleanResponse(r.data);
  return lookupEnsNames(responses);
}

const lookupEnsNames = async (data) => {
  console.log('[lookupEnsNames] looking up ens');
  const ensNamePromises = data.map((sigObj) => lookUpEns(sigObj.data.account))
  const ensNames = await Promise.all(ensNamePromises);
  const withEns = data.map((sigObj, key) => {
    return {
      ...sigObj,
      ens: ensNames[key] === sigObj.data.account ? null: ensNames[key]
    }
  })
  console.log(withEns);
  return withEns;
}

export const lookUpEns = async(account) => {
  console.log('[lookUpEns] looking up ens');
  if (!account) return account;
  let provider = new ethers.providers.InfuraProvider("homestead", Secrets.infura.id); // defaults to homestead
  const ens = await provider.lookupAddress(account);
  return ens ?? account;
}
