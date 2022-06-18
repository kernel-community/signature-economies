import HighlightModal from './index'
import { motion, AnimatePresence } from 'framer-motion'
import { HighlightContext } from '../../contexts/Highlight'
import { useContext } from 'react'

const AnimateHighlightModal = () => {
  const { state } = useContext(HighlightContext)

  return (
    <AnimatePresence>
      {state.modal && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, type: 'tween' }}
          className='flex justify-center fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen z-50'
        >
          <HighlightModal />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimateHighlightModal
