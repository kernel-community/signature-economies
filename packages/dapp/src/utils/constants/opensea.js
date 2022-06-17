module.exports = {
  chainIdToUrl: (id) => {
    switch (id) {
      case 4: return 'https://testnets.opensea.io/assets'
      case 1: return 'https://opensea.io/assets/ethereum'
      default: return 'https://opensea.io/assets/ethereum'
    }
  }
}
