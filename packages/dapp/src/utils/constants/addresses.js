exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x2FAf6aD748Aafd9b093be83E2c2f00B0d8E20795',
        signatureNFT: '0x978512cba89731A477c6e744B0FE231E7C8B983B',
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
exports.seals = 'xh7IjbEgRvcMdd_4Q8bukYkQDm5ZQsQt7Mx5-0TxB1Q' // arweave.net content hash of the root of all seal nfts
