import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { SliderContext } from '../../contexts/Slider';
import MintButton from './MintButton';
import AnimateSlideAndMint from './AnimateSlideAndMint';

const Slider = () => {
  const { state } = useContext(SliderContext);
  return (
    <AnimatePresence>
      { state.modal ? <AnimateSlideAndMint /> : <MintButton /> }
    </AnimatePresence>
  );
}

export default Slider;
