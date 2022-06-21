module.exports = {
  chainIdToUrl: (id) => {
    switch (id) {
      case 4: return 'https://testnets.opensea.io/assets'
      case 1: return 'https://opensea.io/assets/ethereum'
      default: return 'https://opensea.io/assets/ethereum'
    }
  },
  chainIdToCollectionSlug: (id) => {
    switch (id) {
      case 4: return {
        seals: 'https://testnets.opensea.io/collection/signature-fund-qtvtcxcndr',
        sig: 'https://testnets.opensea.io/collection/signature-nfts-pur5qvcsa0'
      }
      case 1: return {
        seals: '',
        sig: ''
      }
      default: return {
        seals: '',
        sig: ''
      }
    }
  }
}
