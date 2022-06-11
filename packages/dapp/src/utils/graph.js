const axios = require('axios').default;


const GET_STEWARD_NFTS = `
  query getStewardNfts($steward: String, $first: Int) {
    account(id: $steward) {
      id
      signatureFunds(first: $first) {
        uri
        id
      }
      signatureNft(first: $first) {
        id
        uri
      }
    }
  }
`

const GET_STEWARD_NFTS_VARS = (address) => {
  return { steward: address.toLowerCase(), first: 3 }
}

const GET_ALL_SEALED_NFTS = `
  query getAllSealedNfts($first: Int) {
    signatureFunds(first: $first) {
      id
      uri
      signedAmount
      steward {
        id
      }
    }
  }
`

const GET_ALL_HIGHLIGHT_NFTS = `
  query getAllHighlightNfts($first: Int) {
    signatureNFTs(first: $first) {
      id
      uri
      createdAtTimestamp
      steward {
        id
      }
    }
  }
`

const Queries = {
  getAllHighlightNfts: {
    query: GET_ALL_HIGHLIGHT_NFTS,
    variables: {first: 4}
  },
  getAllSealedNfts: {
    query: GET_ALL_SEALED_NFTS,
    variables: {first: 4}
  },
  getStewardNfts: {
    query: GET_STEWARD_NFTS,
    variables: GET_STEWARD_NFTS_VARS
  }
}

const graphQuery = axios.create({
  baseURL: "https://api.studio.thegraph.com/query/25032/test-s-e/v0.0.1",
  headers: {
    'Content-type': 'Application/Json'
  }
})

exports.getAllHighlightNfts = async () => {
  return (await graphQuery.post('/', {
    ...Queries.getAllHighlightNfts
  })).data.data.signatureNFTs;
}

exports.getAllSealedNfts = async () => {
  return (await graphQuery.post('/', {
    ...Queries.getAllSealedNfts
  })).data.data.signatureFunds;
}

exports.getAllStewardNfts = async(address) => {
  return (await graphQuery.post("/", {
    query: Queries.getStewardNfts.query,
    variables: Queries.getStewardNfts.variables(address)
  })).data.data.account;
}

