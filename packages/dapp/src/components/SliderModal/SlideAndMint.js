import { useContext } from 'react'
import { createSign } from '../../utils/contracts'
import { useConnect, useProvider, useSigner } from 'wagmi'
import { SliderContext } from '../../contexts/Slider'
import ExecutionButton from '../common/ExecutionButton'
import ConnectButton from '../common/ConnectButton'
import NFTShowcase from './NFTShowcase'
import NFTList from './NFTList'
import SliderInput from './SliderInput'
import CloseButton from './CloseButton'
import Share from '../common/Share'
import { PauseForLoadingContext } from '../../contexts/PauseForLoading'
import etherscan from '../../utils/constants/etherscan'


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

const Minter = () => {
  const slider = useContext(SliderContext)
  const { activeConnector } = useConnect()
  const provider = useProvider()
  const { data: signer } = useSigner()
  const loading = useContext(PauseForLoadingContext);

  const handleOnClickMint = async () => {
    slider.dispatch({ error: false })
    loading.dispatch({ modal: true, text: 'Please sign this transaction' })
    let tx
    try {
      tx = await createSign({
        value: slider.state.input.toString(),
        token: indexToNumber(slider.state.selected + 1),
        provider,
        signer
      })
    } catch (err) {
      console.log(err)
      loading.dispatch({ modal: false })
      slider.dispatch({ tx: undefined, error: true })
      return
    }
    loading.dispatch({ modal: true, text: 'Waiting for your sign to appear in our shared record' })
    await tx.wait(1)
    loading.dispatch({ modal: false })
    slider.dispatch({
      tx: `${etherscan.chainIdToUrl(activeConnector?.id)}/tx/${tx.hash}`
    })
  }
  return (
    <>
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
          <CloseButton />
        </div>
        <NFTShowcase />
        <Description />
        <div className='flex flex-row items-center w-full gap-2 justify-between'>
          <SliderInput />
          <div className='max-w-[128px]'>
            {
            activeConnector
              ? <ExecutionButton
                  exec={handleOnClickMint}
                  isError={slider.state.error}
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
        <CloseButton />
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
                  exec={handleOnClickMint}
                  isError={slider.state.error}
                />
              : <ConnectButton />
            }
          </div>
        </div>
    </div>
    </>
  )
}

const SlideAndMint = () => {
  const { state } = useContext(SliderContext)
  if (state.tx) {
    return <Share />
  } else {
    return (
      <Minter />
    )
  }
}

export default SlideAndMint
