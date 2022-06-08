export const addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x6E10CaDF8F623d90b36A88f8F42a4E02221F6BB9',
        signatureNFT: '0x3488a78A9F5ac75486a1e179447682200DF4D637',
      }
    case 1337:
      return {
        signatureFund: '0xcAb3Dc219b3F11dc8Bf27a08400E40Ca0F72096b',
        signatureNFT: '0x3acDC166a6E2787570174DaAFe67e13a48B74DF9',
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address',
      }
  }
}