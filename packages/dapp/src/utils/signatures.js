import { getAllSignatures, getUserSignature } from './arweave'
const { ethers } = require('ethers')

const infuraId = process.env.INFURA_ID

const cleanResponse = (data) => {
  const { data: { transactions: { edges } } } = data
  return edges.map(edge => {
    let date
    if (edge.node.block) {
      const epoch = edge.node.block.timestamp * 1000
      date = new Date(epoch)
    }
    const signatory = edge.node.tags.find((tag) => tag.name === 'Signatory')
    return {
      id: edge.node.id, // arweave tx id
      date: date ? date.toLocaleDateString(): undefined, // block.timestamp,
      account: signatory?.value
    }
  })
}

// returns an array of {id: arweave tx, signature}
export const get = async () => {
  const r = await getAllSignatures()
  const responses = cleanResponse(r.data)
  return lookupEnsNames(responses)
}

export const getSignOf = async({ signatory }) => {
  const r = await getUserSignature({ signatory })
  const data = cleanResponse(r.data)
  return data.length > 0
}

const lookupEnsNames = async (data) => {
  const ensNamePromises = data.map((sigObj) => lookUpEns(sigObj?.account))
  const ensNames = await Promise.all(ensNamePromises)
  const withEns = data.map((sigObj, key) => {
    return {
      ...sigObj,
      ens: ensNames[key] === sigObj.account ? null : ensNames[key]
    }
  })
  return withEns
}

export const lookUpEns = async (account) => {
  if (!account) return account
  const provider = new ethers.providers.InfuraProvider('homestead', infuraId) // defaults to homestead
  const ens = await provider.lookupAddress(account)
  return ens ?? account
}
