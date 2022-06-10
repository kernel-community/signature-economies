exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0xcAb3Dc219b3F11dc8Bf27a08400E40Ca0F72096b',
        signatureNFT: '0x374ca402e33d19598b90de5f3fc64d0c06563ca9',
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