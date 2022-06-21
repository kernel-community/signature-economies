import  axios from 'axios'
import { arweave } from './constants'
import { weaver } from './constants'

// arweave graphql endpoint
const arweaveQuery = axios.create({
  baseURL: 'https://arweave.net:443',
  headers: {
    'Content-type': 'Application/Json'
  }
})

// upload to arweave
export const uploadToArweave = async ({ signature, account }) => {
  await axios.post(weaver.endpoint + '/rpc/sign', JSON.stringify({ signature, account }), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

export const getUserSignature = async ({ signatory }) => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getUserSignatures(signatory)
  })
}

export const getAllSignatures = () => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getSignatures
  })
}

export const getSignaturesCount = async (cursor) => {
  return arweaveQuery.post('/graphql', {
    ...Queries.getSignatureCount(cursor)
  })
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
          tags {
            name
            value
          }
        }
      }
    }
  }
`

const GET_USER_SIGNATURE_QUERY = `
  query getSignatures(
    $appName: String!, $first: Int, $signatory: String!
  ) {
    transactions(tags:[
      {
        name:"App-Name",
        values:[$appName],
      },
      {
        name:"Signatory",
        values: [$signatory]
      }
    ], sort:HEIGHT_DESC, first: $first) {
      edges {
        node {
          id
          block {
            timestamp
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`

const GET_SIGNATURE_COUNT = `
  query getSignatureCount($appName: String!, $after: String!) {
    transactions(
      tags: [{ name: "App-Name", values: [$appName] }]
      sort: HEIGHT_DESC
      after: $after
      first: 100
    ) {
      edges {
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

const GET_SIGNATURE_QUERY_VARS = {
  appName: arweave.appName,
  first: 15
}

const Queries = {
  getSignatures: {
    query: GET_SIGNATURE_QUERY,
    variables: GET_SIGNATURE_QUERY_VARS
  },
  getUserSignatures: (signatory) => {
    return {
      query: GET_USER_SIGNATURE_QUERY,
      variables: {
        appName: arweave.appName,
        first: 1,
        signatory
      }
    }
  },
  getSignatureCount: (cursor) => {
    return {
      query: GET_SIGNATURE_COUNT,
      variables: {
        appName: arweave.appName,
        first: 100,
        after: cursor
      }
    }
  }
}
