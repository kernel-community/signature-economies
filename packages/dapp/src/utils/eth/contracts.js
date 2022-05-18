import { Contract } from 'ethers'
import { addresses, abis } from './constants'
import { ethers } from 'ethers';

const VALUE = '0.1';

export const createSign = async (selected, provider, signer) => {
  const { chainId } = await provider.getNetwork()
  const value = ethers.utils.parseEther(VALUE);
  const signatureFundContract = new Contract(
      addresses(chainId).signatureFund,
      abis.signatureFund,
      signer)
  return signatureFundContract.createSign(selected, {value: value, gasLimit: 200000})
}

export const mintSelected = async (url, provider, signer) => {
  const { chainId } = await provider.getNetwork()
  const signatureNFTContract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    signer)
  return signatureNFTContract.mintSelected(url)
}

export const nextTokenId = async(provider) => {
  const {chainId} = await provider.getNetwork();
  const signatureNFTContract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    provider)
  return signatureNFTContract.tokenIdCounter()
}