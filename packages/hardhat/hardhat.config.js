require('@nomiclabs/hardhat-waffle')
require('hardhat-deploy')
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-gas-reporter')

if (process.env.PROD_ENV == null) {
  // only update env manually if not already updated (eg by netlify)
  require('dotenv').config({ path: '.env.local' })
}

const INFURA_API_KEY = process.env.INFURA_API_KEY || ''
const MAINNET_PRIVATE_KEY =
    process.env.MAINNET_PRIVATE_KEY ||
    ''
const RINKEBY_PRIVATE_KEY =
    process.env.RINKEBY_PRIVATE_KEY ||
    ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task('mint', 'Mints a reader-generated SignatureNFT')
  .addParam('start', 'The character index the highlight starts at')
  .addParam('end', 'The character index the highlight ends at')
  .setAction(async (taskArgs) => {
    const addressData = require('./deployments/mainnet/SignatureNFT.json')
    const address = addressData.address
    const signatureNFT = await ethers.getContractAt('SignatureNFT', address)
    await signatureNFT.mintSelected(taskArgs.start, taskArgs.end)
  })

task('createSign', 'Mints a sepcific NFT based on the amount of the donation in ETH')
  .addParam('selectednft', 'The number, written out in words, of the NFT they have selected to receive in return for their donation')
  .setAction(async (taskArgs) => {
    const addressData = require('./deployments/rinkeby/SignatureFund.json')
    const address = addressData.address
    const signatureFund = await ethers.getContractAt('SignatureFund', address)
    await signatureFund.createSign(taskArgs.selectednft, { value: ethers.utils.parseEther('1.5') })
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    creator: 1,
    reader: 2, // readers mint signatureNFTs, which are created dynamically from text in the essay
    donator: 3 // donators receive one of 8 preset NFTs, though with slight differences based on how much they donate
  },
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 10000
      },
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: 0 // https://github.com/sc-forks/solidity-coverage/issues/652
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY],
      gasPrice: 10000000000
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MAINNET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  }
}
