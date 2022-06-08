import { motion } from 'framer-motion';
import KernelLogo from '../../images/kernel_logo.png';

const Wait = () => {
  return (
    <div className='w-96 h-96 flex flex-col items-center justify-evenly'>
    <div className=' w-64 h-64 relative flex justify-center items-center'>
       <motion.span
         className='animate-pulse block w-64 h-64 border-4 border-gray-300 border-t-[#07eb9f] rounded-full absolute border-box top-0 left-0'
         animate={{ rotate: 360 }}
         transition={{
           loop: Infinity,
           ease: "linear",
           duration: 1
          }}
       >
       </motion.span>
       <div className=''>
         <img className='w-32 h-32' src={KernelLogo} alt="kernel logo" />
       </div>
     </div>
           <div className='pt-12 text-xl opacity-30 text-center tracking-tight'>
             Waiting for transaction <br/> to be mined.
           </div>
    </div>
  )
}
export default Wait;