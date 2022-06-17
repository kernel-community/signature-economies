import { PauseForLoadingContext } from '../contexts/PauseForLoading'
import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KernelLogo from '../images/kernel_logo.png'

const PauseForLoadingModal = () => {
  const { state } = useContext(PauseForLoadingContext)
  if (!state.modal) return;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, type: 'tween' }}
        className='flex justify-center z-[100] fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen'
      >
        <div className='md:p-8 w-full h-min-content md:w-80 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg'>
          <div className=' w-64 h-64 relative flex justify-center items-center'>
            <motion.span
              className='animate-pulse block w-64 h-64 border-4 border-gray-300 border-t-[#07eb9f] rounded-full absolute border-box top-0 left-0'
              animate={{ rotate: 360 }}
              transition={{
                loop: Infinity,
                ease: 'linear',
                duration: 1
              }}
            />
            <div>
              <img className='w-32 h-32' src={KernelLogo} alt='kernel logo' />
            </div>
          </div>
          <div className='mt-10 text-xl'>
            {state.text}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PauseForLoadingModal
