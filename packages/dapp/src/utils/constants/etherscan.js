module.exports = {
  chainIdToUrl: (id) => {
    switch (id) {
      case 4: return 'https://rinkeby.etherscan.io'
      case 1: return 'https://etherscan.io'
      default: return 'https://rinkeby.etherscan.io'
    }
  }
}
