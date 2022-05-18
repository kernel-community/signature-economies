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
        fixed bg-white select-none border-gray-600 z-50 bottom-8 w-max md:w-auto left-1/2 md:left-auto my-auto md:right-8 border-2 rounded-md p-2 md:p-4 px-12 hover:border-black font-redaction cursor-pointer
      "
      >
        Mint a Sealed NFT
    </motion.div>
  )
}
export default MintButton;