import { useConnect, useSigner } from "wagmi";
import { createSeal, estimateCreateSeal } from "../utils/contracts";
import { SliderContext } from "../contexts/Slider";
import { useState, useContext } from "react";
import useLoading from "./useLoading";
import etherscan from "../utils/constants/etherscan";
import useError from "./useError";
import useShare from "./useShare";

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
  const {activeConnector} = useConnect()

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
  const {data: signer} = useSigner()

  const mint = async() => {
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
    } catch(err) {
      openError("There was an error in estimating gas. It could be due to various reasons, one of them being insufficient funds. Please double-check if you have atleast ~0.5 ETH in your wallet.")
      console.log(err)
      closeLoading()
      setError("Error in estimating gas")
      return
    }

    openLoading('Please sign transaction on your wallet')

    let tx;
    try {
      tx = await createSeal(txData)
    } catch(err) {
      openError("Error in transaction")
      console.log(err)
      closeLoading()
      setError("Error in transaction")
      return
    }

    openLoading('Waiting for transaction to be confirmed')

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
