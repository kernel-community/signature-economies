const addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0xCdE5DbEA69C686b2502A7F0978a43BBF92d12387',
        signatureNFT: '0x5104c86eaA9f0E07640A7F2D6497A8ba839C283c',
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
