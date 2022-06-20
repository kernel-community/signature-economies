import { ethers, Contract } from 'ethers'
import { addresses } from './constants/addresses'
import { abis } from './constants/abi'

export const createSign = async ({ value, token, provider, signer }) => {
  const { chainId } = await provider.getNetwork()
  const signatureFundContract = new Contract(
    addresses(chainId).signatureFund,
    abis.signatureFund,
    signer)
  return signatureFundContract.createSign(token, { value: ethers.utils.parseEther(value) })
}

export const mintSelected = async ({
  provider, signer, start, end
}) => {
  const { chainId } = await provider.getNetwork()
  const signatureNFTContract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    signer
  )
  return signatureNFTContract.mintSelected(start, end)
}
