exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0xd96644cBaD732D4021A60d82710BDC6AA50F7A81',
        signatureNFT: '0x495AB49F0a79B212f02F1183200B21d9C0F3AA36'
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
