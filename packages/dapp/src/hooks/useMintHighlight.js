import { useState, useContext } from "react"
import { useConnect, useSigner } from "wagmi"
import { HighlightContext } from "../contexts/Highlight"
import { estimateHighlightMint, highlightMint } from "../utils/contracts"
import useError from "./useError"
import useLoading from "./useLoading"
import etherscan from "../utils/constants/etherscan"

const useMintHighlight = () => {
  const highlight = useContext(HighlightContext)
  const [error, setError] = useState(null)

  const { data: signer } = useSigner()
  const {activeConnector} = useConnect()

  const {
    open: openLoading, close: closeLoading
  } = useLoading()
  const {
    open: openError
  } = useError()
  const isImage = !!highlight.state.image

  const mint = async() => {
    const chainId = await activeConnector.getChainId()
    if (!isImage) {
      // throw an error here or prompt the user to reload
      console.log('no image found. try reloading the page.')
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
    } catch(err) {
      openError("There was an error in estimating gas")
      console.log(err)
      closeLoading()
      setError("Error in estimating gas")
      return
    }

    openLoading("Please sign transaction on your wallet")

    let tx
    try {
      tx = await highlightMint(txData)
    } catch(err) {
      openError("There was an error in transaction")
      console.log(err)
      closeLoading()
      setError("Error in transaction")
      return
    }

    openLoading('Waiting for transaction to be confirmed')

    await tx.wait(1)

    closeLoading()

    highlight.dispatch({
      tx: `${etherscan.chainIdToUrl(activeConnector?.id)}/tx/${tx?.hash}`
    })
  }

  return {
    mint, isError: !!error, error
  }
}

export default useMintHighlight
