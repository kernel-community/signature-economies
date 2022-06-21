import { useConnect, useSigner } from 'wagmi'
import { createSeal, estimateCreateSeal } from '../utils/contracts'
import { SliderContext } from '../contexts/Slider'
import { useState, useContext } from 'react'
import { etherscan } from '../utils/constants/etherscan'
import useLoading from './useLoading'
import useError from './useError'
import useShare from './useShare'

const indexToNumber = (i) => {
  switch (i) {
    case 1: return 'one'
    case 2: return 'two'
    case 3: return 'three'
    case 4: return 'four'
    case 5: return 'five'
    case 6: return 'six'
    case 7: return 'seven'
    case 8: return 'eight'
    default: throw new Error('invalid number')
  }
}
const useCreateSeal = () => {
  const [error, setError] = useState(null)
  const { activeConnector } = useConnect()

  const {
    open: openLoading, close: closeLoading
  } = useLoading()
  const {
    open: openError
  } = useError()
  const {
    open: openShare
  } = useShare()

  const slider = useContext(SliderContext)
  const { data: signer } = useSigner()

  const mint = async () => {
    const chainId = await activeConnector.getChainId()

    openLoading('Estimating gas costs')

    const txData = {
      ethValue: slider.state.input.toString(),
      token: indexToNumber(slider.state.selected + 1),
      chainId,
      signer
    }
    try {
      await estimateCreateSeal(txData)
    } catch (err) {
      openError('There was an error in estimating gas. This can occur for various reasons, one of them being insufficient funds. Please double-check that you have ~0.5 ETH.')
      console.log(err)
      closeLoading()
      setError('Error estimating gas')
      return
    }

    openLoading('Please sign this transaction')

    let tx
    try {
      tx = await createSeal(txData)
    } catch (err) {
      openError('Error in transaction')
      console.log(err)
      closeLoading()
      setError('Error in transaction')
      return
    }

    openLoading('Waiting for your sign to appear in our shared record')

    await tx.wait(1)

    closeLoading()

    openShare(
      `${etherscan.chainIdToUrl(activeConnector?.id)}/tx/${'tx.hash'}`,
      slider.state.image
    )
    slider.dispatch({ type: 'close' })
  }

  return {
    isError: !!error,
    mint,
    error
  }
}

export default useCreateSeal
