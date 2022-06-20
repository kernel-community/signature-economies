import { useContext, useEffect } from 'react'
import { SliderContext } from '../../contexts/Slider'
import Modal from '../../layouts/Modal'
import SlideAndMint from './SlideAndMint'

const Slider = () => {
  const { state } = useContext(SliderContext)

  if (!state.modal) return;

  return (
    <Modal>
      <SlideAndMint/>
    </Modal>
  )
}

export default Slider
