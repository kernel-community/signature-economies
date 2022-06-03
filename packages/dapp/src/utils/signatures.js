const axios = require('axios').default;
const Constants = require('./constants');

const {protocol, host, port} = Constants.arweave.gateway;

// arweave graphql endpoint
const arweave = axios.create({
   baseURL: protocol + "://" + host + ":" + port,
   headers: {
     'Content-type': 'Application/Json'
   },
});

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

const cleanResponse = (data) => {
  const { data: { transactions: { edges } } } = data;
  const response = edges.map(edge => {
    let date;
    if (edge.node.block) {
      const epoch = edge.node.block.timestamp * 1000;
      date = new Date(epoch);
    }
    return {
      id: edge.node.id,
      date: date ? date.toLocaleDateString(): undefined
    }
  });
  console.log(response);
  return response;
}

// returns an array of {id: arweave tx, signature}
export const get = async () => {
  const r = await arweave.post('/graphql', {
    query: QUERY,
    variables: VARS
  })
  return cleanResponse(r.data);
}
