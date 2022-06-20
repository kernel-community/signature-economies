import { useNetwork } from 'wagmi'

const getEndpoint = () => {
  const { activeChain } = useNetwork()
  if (activeChain === 1) {
    return '/rpc/sign'
  } else {
    return 'https://staging.sign.kernel.community/rpc/sign'
  }
}

export const saveSignature = (signature, account) => {
  let url = getEndpoint()
  return fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ signature, account })})
}

export const getAllSignatures = () => {
  return fetch('https://arweave.net/graphql', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: Queries.getSignatures})
}

// TODO: change this to include the other tag Simon made:
// { key: 'Signatory', value: account }
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
//TODO: update this to change depending on env, i.e. 
// ARWEAVE_APP_NAME: "Kernel-Signature-Economies-Staging" for dev + local
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
