const { getAllHighlightNfts, getAllSealedNfts, getAllStewardNfts } = require("./graph");


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
  return cleanStewardNfts(r);
}

const cleanStewardNfts = async (data) => {
  const allSeals =  cleanSealedNfts(data?.signatureFunds.map(d => {
    return {
      ...d,
      steward: data.id,
    }
  }));
  const allHighlights = cleanHighlightNfts(data?.signatureNft.map(d => {
    return {
      ...d,
      steward: data.id,
    }
  }));
  return [allSeals, allHighlights];
}

const cleanSealedNfts = (data) => {
  if (!data) return [];
  return data.map((d,k) => {
    return {
      ...d,
      steward: d.steward.id ?? d.steward,
    }
  })
}

const cleanHighlightNfts = (data) => {
  if (!data) return[];
  return data.map(d => {
    return {
      ...d,
      steward: d.steward.id ?? d.steward,
    }
  })
}

module.exports = {
  highlightNfts,
  sealedNfts,
  stewardNfts
}
