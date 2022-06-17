import { useContext } from 'react'
import { useConnect, useSigner, useProvider } from 'wagmi'
import { HighlightContext } from '../../contexts/Highlight'
import ExecutionButton from '../common/ExecutionButton'
import ConnectButton from '../common/ConnectButton'
import { mintSelected } from '../../utils/contracts'
import { PauseForLoadingContext } from '../../contexts/PauseForLoading'
import etherscan from '../../utils/constants/etherscan'

const Footer = () => {
  const highlight = useContext(HighlightContext)
  const loading = useContext(PauseForLoadingContext);

  const { activeConnector } = useConnect()
  const { data: signer } = useSigner()
  const provider = useProvider()

  const isImage = !!highlight.state.image

  const mint = async () => {

    highlight.dispatch({ error: false })

    if (!isImage) {
      // throw an error here or prompt the user to reload
      console.log('no image found. try reloading the page.')
      return
    }

    loading.dispatch({
      modal: true,
      text: 'Please confirm on your wallet'
    })

    let tx
    try {
      tx = await mintSelected({
        provider,
        signer,
        start: highlight.state.start,
        end: highlight.state.end
      })
    } catch (err) {
      console.log('there was an error')
      loading.dispatch({
        modal: false
      })
      highlight.dispatch({
        tx: undefined
      })
      highlight.dispatch({
        error: true
      })
      return
    }
    loading.dispatch({ modal: true, text: 'Waiting for transaction to be confirmed' })
    await tx.wait(1)
    loading.dispatch({ modal: false })
    highlight.dispatch({
      tx: `${etherscan.chainIdToUrl(activeConnector?.id)}/tx/${tx?.hash}`
    })
  }
  return (
    <div className='flex flex-row w-full justify-center gap-x-4 text-center my-5'>
      <ExecutionButton
        text='Cancel'
        exec={() => highlight.dispatch({ type: 'close' })}
        selectStyle='basic'
      />
      {
        !activeConnector
          ? <ConnectButton />
          : <ExecutionButton
              text='Mint'
              exec={mint}
              disabled={!isImage}
              isError={highlight.state.error}
            />
      }
    </div>
  )
}

export default Footer
