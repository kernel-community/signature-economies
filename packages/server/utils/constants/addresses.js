exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x6E10CaDF8F623d90b36A88f8F42a4E02221F6BB9',
        signatureNFT: '0x3488a78A9F5ac75486a1e179447682200DF4D637',
      }
    case 1337:
      return {
        signatureFund: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
        signatureNFT: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address',
      }
  }
}