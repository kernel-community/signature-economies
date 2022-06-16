import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { SliderContext } from '../../contexts/Slider'
import AnimateSlideAndMint from './AnimateSlideAndMint'
import ExecutionButton from '../common/ExecutionButton'

const Slider = () => {
  const { state, dispatch } = useContext(SliderContext)

  useEffect(() => {
    if (state.modal) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [state.modal])

  return (
    <AnimatePresence>
      {
        state.modal
          ? <AnimateSlideAndMint />
          : <ExecutionButton
              exec={() => dispatch({ type: 'open' })}
              tween
              selectStyle='big'
              text='Mint a Sealed NFT'
              fixed
              bringToFront
            />
      }
    </AnimatePresence>
  )
}

export default Slider
