const addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0xAa5498C572de5502E3Ea2C0651C92cbbeB061463',
        signatureNFT: '0x4254054C6A6Fc3288f4c7C647EB07e9b16836c3c',
      }
    case 1337:
      return {
        signatureFund: process.env.FUND_ADDRESS,
        signatureNFT: process.env.NFT_ADDRESS,
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address',
      }
  }
}

const abis = {
  signatureNFT: `[
    {
        "inputs": [
            {
            "internalType": "string",
            "name": "uri",
            "type": "string"
            }
        ],
        "name": "mintSelected",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        }
  ]`,
  signatureFund: `[
    {
        "inputs": [
          {
            "internalType": "string",
            "name": "selectedNFT",
            "type": "string"
          }
        ],
        "name": "createSign",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
  ]`,
}

export { addresses, abis }
