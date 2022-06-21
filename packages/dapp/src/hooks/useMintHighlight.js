import { useState, useContext } from 'react'
import { useConnect, useSigner } from 'wagmi'
import { HighlightContext } from '../contexts/Highlight'
import { estimateHighlightMint, highlightMint } from '../utils/contracts'
import useError from './useError'
import useLoading from './useLoading'
import etherscan from '../utils/constants/etherscan'
import useShare from './useShare'

const useMintHighlight = () => {
  const highlight = useContext(HighlightContext)
  const [error, setError] = useState(null)

  const { data: signer } = useSigner()
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

  const isImage = !!highlight.state.image

  const mint = async () => {
    const chainId = await activeConnector.getChainId()
    if (!isImage) {
      // throw an error here or prompt the user to reload
      console.log('We failed to load the image correctly. Please try reloading the page.')
      return
    }
    openLoading('Estimating gas costs')

    const txData = {
      chainId,
      signer,
      start: highlight.state.start,
      end: highlight.state.end
    }

    try {
      await estimateHighlightMint(txData)
    } catch (err) {
      openError('There was an error when estimating gas costs. Please try again.')
      console.log(err)
      closeLoading()
      setError('Error in estimating gas')
      return
    }

    openLoading('Please sign this transaction')

    let tx
    try {
      tx = await highlightMint(txData)
    } catch (err) {
      openError('There was an error. Please try again.')
      console.log(err)
      closeLoading()
      setError('Failed to submit transaction')
      return
    }

    openLoading('Waiting for your sign to appear in our shared record')

    await tx.wait(1)

    closeLoading()

    openShare({
      url: `${etherscan.chainIdToUrl(activeConnector?.id)}/tx/${tx?.hash}`,
      img: highlight.state.image
    })
    highlight.dispatch({ type: 'close' })
  }

  return {
    mint, isError: !!error, error
  }
}

export default useMintHighlight
