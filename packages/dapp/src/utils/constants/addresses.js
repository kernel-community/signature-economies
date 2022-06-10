exports.addresses = (chainId) => {
  switch (chainId) {
    case 4:
      return {
        signatureFund: '0x6E10CaDF8F623d90b36A88f8F42a4E02221F6BB9',
        signatureNFT: '0x3488a78A9F5ac75486a1e179447682200DF4D637',
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