exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x2927AD93DABd45256A5Be108BeDd0a85E5A3B7E5',
        signatureNFT: '0xBcfaC48303B4a91a7B9AaE1Bc9A7F561563d625b'
      }
    case 1337:
      return {
        signatureFund: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        signatureNFT: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address'
      }
  }
}
exports.seals = 'SuPXgNnLyr_X4FR-a9M3jTloVH9wZnN334g9ToxyNZU' // arweave.net content hash of the root of all seal nfts
