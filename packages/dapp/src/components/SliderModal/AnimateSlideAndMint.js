import SlideAndMint from './SlideAndMint';
import { motion, AnimatePresence } from 'framer-motion';

const AnimateModal = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="
          flex justify-center z-50
          fixed top-0 left-0 bg-gray-500/30
          backdrop-blur-lg w-screen h-screen
        "
      >
        <SlideAndMint />
      </motion.div>
    </AnimatePresence>
  )
}
export default AnimateModal;