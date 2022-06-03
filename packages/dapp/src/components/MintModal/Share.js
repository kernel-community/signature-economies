import { motion } from 'framer-motion';
import MockMinted from '../../images/mock_minted.png';

const Share = () => {

  return (
   <div className='w-max p-12 flex flex-col items-center justify-evenly'>
     {/* This image can be either the highlight nft or the sealed nft */}
     <img src={MockMinted} className='w-[350px] shadow-xl' />

     <div className='pt-4 text-center text-sm opacity-30'>
       Transaction Successful <br/>
       View on <a href='https://etherscan.io/tx/0x0' className='text-blue-500'>Etherscan</a>
     </div>
     
     <div className="mt-12 bg-white select-none text-center py-2 px-4 md:px-8 md:py-4 w-64 border-2 rounded-md border-black font-redaction cursor-pointer">
        View Soul Sign
    </div>
   </div>
  )
}
export default Share;