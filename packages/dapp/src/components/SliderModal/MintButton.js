import { useContext } from 'react';
import { SliderContext } from '../../contexts/Slider';
import { motion } from 'framer-motion';

const MintButton = () => {
  const { dispatch } = useContext(SliderContext);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2, type: "tween" }}
      onClick={() => dispatch({ type: 'open' })}
      className="
        fixed bg-white select-none text-center bottom-8 border-gray-600 z-50 py-2 px-4 md:px-8 md:py-4 right-1/2 md:right-8 w-48 md:w-64 -mr-24 md:-mr-0 border-2 rounded-md hover:border-black font-redaction cursor-pointer"
      >
        Mint a Sealed NFT
    </motion.div>
  )
}
export default MintButton;