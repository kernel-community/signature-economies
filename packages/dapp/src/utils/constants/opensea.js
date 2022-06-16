module.exports = {
  base: 'https://opensea.io/assets',
  chainIdToName: (id) => {
    switch (id) {
      case 4: return 'rinkeby'
      case 1: return 'ethereum'
      default: return 'ethereum'
    }
  }
}
