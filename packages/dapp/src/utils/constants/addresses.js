export const addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x6E10CaDF8F623d90b36A88f8F42a4E02221F6BB9',
        signatureNFT: '0x3488a78A9F5ac75486a1e179447682200DF4D637',
      }
    case 1337:
      return {
        signatureFund: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
        signatureNFT: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address',
      }
  }
}