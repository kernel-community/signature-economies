import { Contract } from 'ethers'
import { addresses, abis } from './constants'

// 'uri' is the Arweave uri as a string, generated once the reader has confirmed their text selection
export const mintSelected = async (uri) => {
  const { chainId } = await provider.getNetwork()

  const signatureNFTContract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    provider)

  return await signatureNFTContract.mintSelected(uri)
  
}

// 'selected' is the number of the static NFT, as a string (one - eight)
export const createSign = async (selected) => {
  const { chainId } = await provider.getNetwork()

  const signatureFundContract = new Contract(
      addresses(chainId).signatureFundContract, 
      abis.signatureFundContract, 
      provider)

  return await signatureFundContract.createSign(selected)
}


