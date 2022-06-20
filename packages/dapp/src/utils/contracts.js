import { addresses, abis } from './constants'
import { ethers, Contract } from 'ethers'

export const estimateCreateSeal = ({
  ethValue, token, chainId, signer
}) => {
  const contract = new Contract(
    addresses(chainId).signatureFund,
    abis.signatureFund,
    signer)
  const value = ethers.utils.parseEther(ethValue)
  return contract.callStatic.createSign(token, { value })
}

export const createSeal = ({
  ethValue, token, chainId, signer
}) => {
  const contract = new Contract(
    addresses(chainId).signatureFund,
    abis.signatureFund,
    signer)
  const value = ethers.utils.parseEther(ethValue)

  return contract.createSign(token, { value })
}

export const estimateHighlightMint = ({
  chainId, signer, start, end
}) => {
  const contract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    signer
  )
  return contract.callStatic.mintSelected(start, end)
}

export const highlightMint = ({
  chainId, signer, start, end
}) => {
  const contract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    signer
  )
  return contract.mintSelected(start, end)
}

export const ownerOf = async (provider, id) => {
  const { chainId } = await provider.getNetwork()
  const signatureNFTContract = new Contract(
    addresses(chainId).signatureNFT,
    abis.signatureNFT,
    provider)
  return signatureNFTContract.ownerOf(id)
}
