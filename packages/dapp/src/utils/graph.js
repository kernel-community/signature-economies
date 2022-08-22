import axios from 'axios'
import { graph } from './constants'

const GET_STEWARD_NFTS = `
  query getStewardNfts($steward: String, $first: Int) {
    account(id: $steward) {
      id
      signatureFunds(first: $first) {
        selectMeta
        id
      }
      signatureNft(first: $first) {
        id
        start
        end
      }
    }
  }
`

const GET_STEWARD_NFTS_VARS = (address) => {
  return { steward: address.toLowerCase(), first: 4 }
}

const GET_ALL_SEALED_NFTS = `
  query getAllSealedNfts($first: Int) {
    signatureFunds(first: $first) {
      id
      signedAmount
      selectMeta
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
      start
      end
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
    variables: { first: 12 }
  },
  getAllSealedNfts: {
    query: GET_ALL_SEALED_NFTS,
    variables: { first: 12 }
  },
  getStewardNfts: {
    query: GET_STEWARD_NFTS,
    variables: GET_STEWARD_NFTS_VARS
  }
}

const graphQuery = axios.create({
  baseURL: graph.baseURL,
  headers: {
    'Content-type': 'Application/Json'
  }
})

export const getAllHighlightNfts = async () => {
  return (await graphQuery.post('/', {
    ...Queries.getAllHighlightNfts
  })).data.data.signatureNFTs
}

export const getAllSealedNfts = async () => {
  return (await graphQuery.post('/', {
    ...Queries.getAllSealedNfts
  })).data.data.signatureFunds
}

export const getAllStewardNfts = async (address) => {
  return (await graphQuery.post('/', {
    query: Queries.getStewardNfts.query,
    variables: Queries.getStewardNfts.variables(address)
  })).data.data.account
}
