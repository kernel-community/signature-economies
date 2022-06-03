import { AnimatePresence, motion } from 'framer-motion';

const AnchorButton = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2, type: "tween" }}
            >
                <a href='#free-sign' className='bg-white select-none text-center fixed bottom-28 right-8 border-gray-600 border-2 py-2 px-4 md:px-8 md:py-4 rounded-md w-48 md:w-64 font-redaction no-underline cursor-pointer z-50'>
                        Sign Freely
                </a>
            </motion.div>
        </AnimatePresence>
    )
  }
  
  export default AnchorButton;