import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { SliderContext } from '../../contexts/Slider'
import AnimateSlideAndMint from './AnimateSlideAndMint'

const Slider = () => {
  const { state } = useContext(SliderContext)

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

  if (!state.modal) return;

  return (
    <AnimatePresence>
      <AnimateSlideAndMint />
    </AnimatePresence>
  )
}

export default Slider
