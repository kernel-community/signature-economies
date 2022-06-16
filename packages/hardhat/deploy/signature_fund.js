module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  let { deployer, creator } = await getNamedAccounts()

  let PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
  let WETH_ADDRESS = ''
  const network = await hre.ethers.provider.getNetwork()
  console.log(`network: ${network.name}`)
  if (network.name === 'rinkeby') {
    console.log('Using Opensea registration address for Rinkeby')
    PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
    creator = '0x1D32F2aCB832AFc3D8c8ffB3BE20e8dC7Faac507'
    WETH_ADDRESS = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
  } else {
    const WETH = await ethers.getContractFactory('WETH')
    const weth = await WETH.deploy()
    WETH_ADDRESS = weth.address
    console.log('WETH address: ', WETH_ADDRESS)
  }

  await deploy('SignatureFund', {
    from: deployer,
    args: [PROXY_REGISTRATION_ADDRESS, creator, WETH_ADDRESS],
    log: true
  })
}
module.exports.tags = ['SignatureFund']
