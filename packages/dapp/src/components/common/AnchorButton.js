import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { SliderContext } from '../../contexts/Slider';

const AnchorButton = () => {
    const { state, dispatch } = useContext(SliderContext);

    useEffect(() => {
        if (state.modal) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';
        }
        return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
        };
    }, [state.modal]);
    return (
        <AnimatePresence>
            {
                state.modal ?
                ''
                :
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2, type: "tween" }}
                >
                    <a href='#free-sign' className='bg-white select-none text-center fixed bottom-24 right-1/2 md:right-8 -mr-24 md:-mr-0 md:bottom-28 border-gray-600 border-2 py-2 px-4 md:px-8 md:py-4 rounded-md w-48 md:w-64 font-redaction no-underline cursor-pointer z-50'>
                            Sign Freely
                    </a>
                </motion.div>
            }
        </AnimatePresence>
    )
  }
  
  export default AnchorButton;