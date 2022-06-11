exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x2FAf6aD748Aafd9b093be83E2c2f00B0d8E20795',
        signatureNFT: '0x978512cba89731A477c6e744B0FE231E7C8B983B',
      }
    case 1337:
      return {
        signatureFund: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        signatureNFT: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      }
    default:
      return {
        signatureFund: 'mainnet sigNFT address',
        signatureNFT: 'mainnet sigFund address',
      }
  }
}
exports.seals = 'xh7IjbEgRvcMdd_4Q8bukYkQDm5ZQsQt7Mx5-0TxB1Q' // arweave.net content hash of the root of all seal nfts
