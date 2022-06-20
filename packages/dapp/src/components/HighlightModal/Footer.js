import { useContext } from 'react'
import { useConnect } from 'wagmi'
import { HighlightContext } from '../../contexts/Highlight'
import ExecutionButton from '../common/ExecutionButton'
import ConnectButton from '../common/ConnectButton'
import useMintHighlight from '../../hooks/useMintHighlight'

const Footer = () => {
  const highlight = useContext(HighlightContext)
  const { activeConnector } = useConnect()
  const {mint} = useMintHighlight()

  const isImage = !!highlight.state.image

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
            />
      }
    </div>
  )
}

export default Footer
