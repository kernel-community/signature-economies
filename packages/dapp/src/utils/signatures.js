import { getAllSignatures, getUserSignature, getSignaturesCount } from './arweave'
import { ethers } from 'ethers'

const cleanResponse = (data) => {
  const { data: { transactions: { edges } } } = data
  return edges.map(edge => {
    let date, signatory
    if (edge.node.block) {
      const epoch = edge.node.block.timestamp * 1000
      date = new Date(epoch)
    }
    if (edge.node.tags) {
      signatory = edge.node.tags.find((tag) => tag.name === 'Signatory')
    }
    return {
      id: edge.node.id, // arweave tx id
      date: date ? date.toLocaleDateString() : undefined, // block.timestamp,
      account: signatory?.value ?? undefined
    }
  })
}

// returns an array of {id: arweave tx, signature}
export const get = async () => {
  const r = await getAllSignatures()
  const responses = cleanResponse(r.data)
  return lookupEnsNames(responses)
}

export const getSignOf = async ({ signatory }) => {
  const r = await getUserSignature({ signatory })
  const data = cleanResponse(r.data)
  return data.length > 0
}

export const getSignatureCount = async () => {
  let count = 0; let cursor = ''; let hasMore
  do {
    const r = await getSignaturesCount(cursor)
    const { data: { transactions: { edges } } } = r.data
    ;({ data: { transactions: { pageInfo: { hasNextPage: hasMore } } } } = r.data)
    count += edges.length
    cursor = edges[edges.length - 1].cursor
  } while (hasMore)
  return count
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
  const provider = new ethers.providers.CloudflareProvider() // defaults to homestead
  const ens = await provider.lookupAddress(account)
  return ens ?? account
}
