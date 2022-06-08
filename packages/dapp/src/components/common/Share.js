import { useContext } from 'react';
import { HighlightContext } from '../../contexts/Highlight';

const Share = () => {
  const { state } = useContext(HighlightContext);

  return (
   <div className='w-max p-12 flex flex-col items-center justify-evenly'>
     {
      state.image &&
        <img src={state.image} alt="" style={{ width: '500px', height: '750px', maxWidth: '500px' }} />
    }
     <div className='pt-4 text-center text-sm opacity-30'>
       Transaction Successful <br/>
       View on <a href='https://etherscan.io/tx/0x0' className='text-blue-500' target={"_blank"} rel="noreferrer">Etherscan</a>
     </div>

     <div className="mt-12 bg-white select-none text-center py-2 px-4 md:px-8 md:py-4 w-64 border-2 rounded-md border-black font-redaction cursor-pointer">
        View Soul Sign
    </div>
   </div>
  )
}
export default Share;