import { Contract } from 'ethers'
import { addresses, abis } from './constants'


// 'selected' is the number of the static NFT, as a string (one - eight)
export const createSign = async (selected, value, provider, signer) => {
  const { chainId } = await provider.getNetwork()

  const signatureFundContract = new Contract(
      addresses(chainId).signatureFund,
      abis.signatureFund,
      signer)

  return await signatureFundContract.createSign(selected, {value: value, gasLimit: 200000})
}


