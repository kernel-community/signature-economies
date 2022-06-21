import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ children, bringToFront = false }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, type: 'tween' }}
        className={
          `flex justify-center fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen ${bringToFront ? 'z-[999]' : 'z-[100]'}`
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
