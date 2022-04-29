// Arweave and Ethereum signing utilities.
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
const DOC_TYPE = "sign_eco_doc_type";
const DOC_REF = "sign_eco_doc_ref";
const SIG_ADDR = "sign_eco_sig_addr";
const SIG_SIG = "sign_eco_sig_signature";

// TODO: are we still going to use next.js?
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

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

// I don't think we need this as there is no forking enabled for this essay, but perhaps still necessary to fetch the essay from Arweave, where we will put it?
export async function getEssay(txId) {

  const res = {
    txId,
    data: {},
    sigs: [],
    status: 404,
  };
  const txStatus = await arweave.transactions.getStatus(txId);
  if (txStatus.status !== 200) {
    res.status = txStatus.status;
    return res;
  }

  const transactionMetadata = await arweave.transactions.get(txId);
  const tags = transactionMetadata.get('tags').reduce((prev, tag) => {
    let key = tag.get('name', {decode: true, string: true});
    prev[key] = tag.get('value', {decode: true, string: true});
    return prev;
  }, {});

  // ensure correct type, return undefined otherwise
  if (!(DOC_TYPE in tags) || !['document', 'sign_eco'].includes(tags[DOC_TYPE])) {
    return res;
  }

  // otherwise metadata seems correct, go ahead and fetch
  const blockId = txStatus.confirmed.block_indep_hash;
  const blockMeta = await arweave.blocks.get(blockId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const time = new Date(blockMeta.timestamp * 1000);
  const data = JSON.parse(await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  }));
  data.body = data.document || data.sign_eco // backwards compatability

  res.data = {
    ...data,
    timestamp: time.toLocaleDateString('en-US', options),
  };

  res.status = 200;
  return res;
}
