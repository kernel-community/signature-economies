const axios = require('axios').default
const Constants = require('./constants')
const Arweave = require('arweave').default
const { protocol, host, port } = Constants.arweave.gateway

// arweave graphql endpoint
const arweaveQuery = axios.create({
  baseURL: protocol + '://' + host + ':' + port,
  headers: {
    'Content-type': 'Application/Json'
  }
})

// arweave client sdk
const arweaveClient = Arweave.init(Constants.arweave.gateway)

// to upload singatures to arweave
const weaver = axios.create({
  baseURL: Constants.weaver,
  headers: {
    'Content-type': 'Application/Json'
  }
})

// upload to arweave
// tags = array of objects
// {key: "", value: ""}
export const uploadToArweave = async ({ data, contentType, tags }) => {
  const { arUrl } = (await weaver.post('/upload', {
    data, contentType, tags
  })).data
  return { arUrl }
}

export const saveSig = async ({ signer, signature }) => await weaver.post('/save', {
  signer, signature
})

export const sigCheck = async ({ signer }) => {
  const { found } = (await weaver.post('/check', { signer })).data
  return { found }
}

export const getAllSignatures = () => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getSignatures
  })
}

export const getTransactionData = async (tx, opts = { decode: true, string: true }) => {
  return arweaveClient.transactions.getData(tx, { ...opts })
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
  appName: 'Kernel-Signature-Economies',
  first: 15
}

const Queries = {
  getSignatures: {
    query: GET_SIGNATURE_QUERY,
    variables: VARS
  }
}
