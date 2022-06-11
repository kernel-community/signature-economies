// forgive me for horrible choice of variable names :(

import { getAllSignatures, getTransactionData } from './arweave';
const { ethers } = require('ethers');
const Secrets = require("./secrets.json");

const cleanResponse = async(data) => {
  const { data: { transactions: { edges } } } = data;
  return edges.map(edge => {
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
}

const fetchCompleteResponse = async (transactionIds) => {
  const txDataPromises = transactionIds.map((tx) => getTransactionData(tx.id));
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
  const r = await getAllSignatures();
  let responses = await cleanResponse(r.data);
  let withCompleteData = await fetchCompleteResponse(responses);
  return lookupEnsNames(withCompleteData);
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
