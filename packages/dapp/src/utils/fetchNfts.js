const { getTransactionData } = require("./arweave");
const { getAllHighlightNfts, getAllSealedNfts, getAllStewardNfts } = require("./graph");
const Constants = require("./constants");

const SEALS = Constants.seals;

const highlightNfts = async () => {
  const r = await getAllHighlightNfts();
  return cleanHighlightNfts(r);
}

const sealedNfts = async () => {
  const r = await getAllSealedNfts();
  return cleanSealedNfts(r);
}

const stewardNfts = async (address) => {
  const r = await getAllStewardNfts(address);
  console.log(r);
  return cleanStewardNfts(r);
}

const cleanStewardNfts = async (data) => {
  const allSeals = await cleanSealedNfts(data.signatureFunds.map(d => {
    return {
      steward: data.id,
      uri: d.uri
    }
  }));
  const allHighlights = data.signatureNft.map(d => {
    return {
      steward: data.id,
      uri: d.uri
    }
  });
  return [...allSeals, ...allHighlights];
}

const cleanSealedNfts = async (data) => {
  console.log("[cleanSealedNfts]", data);
  const allSeals = JSON.parse(await getTransactionData(SEALS));

  const withPath = data.map(d => {
    const [,...path] = d.uri.replace("https://arweave.net/", "").split("/");
    return {
      ...d,
      steward: d.steward.id ?? d.steward,
      metadata: allSeals.paths[path.join("/")]?.id ?? allSeals.paths["0/one.json"].id
    }
  })

  const uriPromises = withPath.map(d => getTransactionData(d.metadata))

  let uris = await Promise.all(uriPromises);

  uris = uris.map(u => JSON.parse(u).image.replace("ar://", "https://arweave.net/"));

  const withUris = withPath.map((d,k) => {
    return {
      ...d,
      uri: uris[k]
    }
  })
  return withUris;
}

const cleanHighlightNfts = (data) => {
  return data.map(d => {
    return {
      ...d,
      steward: d.steward.id,
      uri: d.uri.replace("https://ipfs.io", "https://opensea.mypinata.cloud")
    }
  })
}

module.exports = {
  highlightNfts,
  sealedNfts,
  stewardNfts
}
