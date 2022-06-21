module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  let { deployer } = await getNamedAccounts()

  let PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
  let creator = '0x7DAC9Fc15C1Db4379D75A6E3f330aE849dFfcE18'
  let WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const network = await hre.ethers.provider.getNetwork()
  console.log(`network: ${network.name}`)
  if (network.name === 'rinkeby') {
    console.log('Using Opensea registration address for Rinkeby')
    PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
    creator = '0x1D32F2aCB832AFc3D8c8ffB3BE20e8dC7Faac507'
    WETH_ADDRESS = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
  }

  await deploy('SignatureFund', {
    from: deployer,
    args: [PROXY_REGISTRATION_ADDRESS, creator, WETH_ADDRESS],
    log: true
  })
}
module.exports.tags = ['SignatureFund']
