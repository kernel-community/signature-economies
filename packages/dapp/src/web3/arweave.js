// Arweave utility.

// This file will need to be refactored entirely.
// We want it to fulfill two and only two functions:

// 1. Upload dynamically generated images from reader-selected text and return the Arweave url at which
// the image is stored so we can pass it in as the 'url' param in highlight-modal.js.

// 2. Store the signed messages of those who have signed the essay for free so we can display them easily
// below the essay and ensure that references to those signatures are stored permanently somewhere accessible.

// All Ethereum signing functionality ought to be moved to sign.js
import Arweave from 'arweave';
import {ethers} from "ethers";

function init() {
  return Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });
}

const arweave = init();

const ADMIN_ACCT = "aTVJ7D57uAZWpMixb5igGF7ThGwW43NGkt7HBzYr7hg";
const SIG_ADDR = "sign_eco_sig_addr";

const jsonOrErrorHandler = async response => {
  const resp = response.json()
  if (response.ok) {
    return resp;
  }

  if (resp) {
    const error = await resp
    throw new Error(error.message ?? error.errors[0].message)
  } else {
    throw new Error('Internal server error')
  }
}

export async function generateSignature(sign_eco) {
  // We should be using the wagmi hooks here instead of window.ethereum checks.
  if (!window.ethereum) {
    throw new Error("No wallet found. Please install Metamask or another Web3 wallet provider.");
  }

  // Sign the essay. Any errors here should be handled by the caller.
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(sign_eco.trim())
}

export async function signDeclaration(txId, name, sign_eco, signature) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Verify the signature, and print to console for convenience
  const verifyingAddress = ethers.utils.verifyMessage(sign_eco.trim(), signature);
  if (verifyingAddress !== address) {
    throw new Error("Signature mismatch")
  }

  const formData = new URLSearchParams({
    name,
    address,
    signature,
  });

  await fetch(`${SERVER_URL}/sign/${txId}`, {
    method: 'post',
    body: formData,
  }).then(jsonOrErrorHandler)
}

{/* 
Transactions are mined into Arweave blocks in 60 mins
So signature query order is roughly buckets by that
*/}
export async function fetchSignatures(txId, prevTx) {
  const req = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query {
        transactions(
          first: 50,
          sort: HEIGHT_ASC,
          ${prevTx ? `after: "${prevTx}",` : ''}
          tags: [
            {
              name: "${DOC_TYPE}",
              values: ["signature"]
            },
            {
              name: "${DOC_REF}",
              values: ["${txId}"]
            }
          ],
          owners: ["${ADMIN_ACCT}"],
        ) {
          edges {
            cursor
            node {
              id
              tags {
                name
                value
              }
              block {
                  id
                  timestamp
                  height
              }
            }
          }
        }
      }
      `
    })
  }).then(jsonOrErrorHandler);

  // TODO: not exactly sure which of these can go. Almost definitely name + handle + verified, but likely also others.
  const safeTag = (node, tagName, defaultValue) => {
    const tag = node.tags.find(tag => tag.name === tagName)
    return tag ? tag.value : defaultValue;
  }

  return req.data.transactions.edges.flatMap(nodeItem => {
    const cursor = nodeItem.cursor;
    const n = nodeItem.node;
    const sig = safeTag(n, SIG_ADDR, "UNKWN");

    return [{
      CURSOR: cursor,
      SIG_ID: n.id,
      SIG_ADDR: sig,
      SIG_SIG: safeTag(n, SIG_SIG, "UNKWN"),
    }];
  });
}

export function dedupe(sigs) {
  const unique_set = sigs.reduce((total, cur) => {
    if (!total.hasOwnProperty(cur.SIG_ADDR)) {
      // unique addr
      total[cur.SIG_ADDR] = cur
    } else {
      const old = total[cur.SIG_ADDR]
      // dupe, can overwrite it current one is verified or old one is not verified
      if (cur.SIG_ISVERIFIED || !old.SIG_ISVERIFIED) {
        total[cur.SIG_ADDR] = cur
      }
    }
    return total
  }, {})
  return Object.values(unique_set)
}

// TODO: sort these by block signed, placing the most recent ones first so we have a rolling list of sigs at the bottom of the essay
export function sortSigs(sigs) {
  return sigs.sort((a, b) => priority(a) - priority(b));
}
