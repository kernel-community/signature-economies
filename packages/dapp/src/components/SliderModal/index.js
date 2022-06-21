import { useContext } from 'react'
import { useConnect } from 'wagmi'
import { SliderContext } from '../../contexts/Slider'
import ExecutionButton from '../common/ExecutionButton'
import ConnectButton from '../common/ConnectButton'
import NFTShowcase from './NFTShowcase'
import NFTList from './NFTList'
import SliderInput from './SliderInput'
import CloseButton from '../common/CloseButton'
import useCreateSeal from '../../hooks/useCreateSeal'
import Modal from '../../layouts/Modal'

const Description = () => {
  return (
    <div className='text-gray-600 text-left text-sm font-garamond py-4 overflow-scroll sm:overflow-visible sm:text-base'>
      <div>
        Each seal signifies a planet and is inscribed with one of the quotes found in this essay, with more music in the interplanetary metadata too...
      </div>
      <div>
        Click on the image to explore the guiding star for this unique symbol.
      </div>
    </div>
  )
}


const Minter = () => {
  const { activeConnector } = useConnect()
  const { mint } = useCreateSeal()
  const { state, dispatch } = useContext(SliderContext)
  if (!state.modal) return;
  return (
    <Modal>
      {/* DESKTOP */}
      <div className='
        hidden
        sm:flex

        flex-row
        gap-0
        bg-white
        h-[40rem]
        my-auto
        justify-between
        w-[52rem]
        p-4
        rounded-lg
      '>
        <div className='
          flex
          flex-col
          w-[18rem]
          p-2
          gap-2
        '>
          <div className='font-redaction text-gray-400 text-xl'>
            Select a Seal
          </div>
          <div className='overflow-scroll flex flex-col gap-2'>
            <NFTList />
          </div>
        </div>
        <div className='
          grow sm:p-2 w-[22rem]
          flex flex-col gap-4 items-center justify-between
        '>
          <div className='self-end'>
            <CloseButton exec={() => dispatch({type: 'close'})} />
          </div>
          <NFTShowcase />
          <Description />
          <div className='flex flex-row items-center w-full gap-2 justify-between'>
            <SliderInput />
            <div className='max-w-[128px]'>
              {
              activeConnector
                ? <ExecutionButton
                    exec={mint}
                  />
                : <ConnectButton />
              }
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className='
        sm:hidden
        bg-white
        overflow-scroll
        w-[20rem]
        p-4
        flex flex-col gap-4
      '>
        <div className='flex flex-row justify-between items-center'>
          <div className='font-redaction text-gray-400 text-xl'>
            Select a Seal
          </div>
          <CloseButton exec={() => dispatch({type:'close'})}/>
        </div>
        <div className='flex'>
          <div className='
            flex flex-row gap-1 overflow-scroll
          '>
            <NFTList />
          </div>
        </div>
          <NFTShowcase />
          <Description />
          <div className='flex flex-col gap-4 items-center w-full  justify-between'>
            <SliderInput />
            <div className='max-w-[128px]'>
              {
              activeConnector
                ? <ExecutionButton
                    exec={mint}
                  />
                : <ConnectButton />
              }
            </div>
          </div>
      </div>
    </Modal>
  )
}


export default Minter
