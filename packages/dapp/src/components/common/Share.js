import { useContext } from 'react';
import { HighlightContext } from '../../contexts/Highlight';
import { SliderContext } from '../../contexts/Slider';
import { Link } from 'react-router-dom';

const Share = () => {
  const { state: highlightState } = useContext(HighlightContext);
  const { state: sliderState } = useContext(SliderContext);

  return (
   <div className='w-max p-12 flex flex-col items-center justify-center my-auto bg-white rounded-lg shadow-xl'>
    <div className='flex flex-row gap-2'>
    {
      highlightState.image &&
      <div>
        <img src={highlightState.image} alt="" style={{ width: '320px', height: '500px', maxWidth: '500px' }} />
        <div className='pt-4 text-center text-sm opacity-30'>
        Transaction Successful <br/>
        View on <a href={highlightState.tx} className='text-blue-500' target={"_blank"} rel="noreferrer">Etherscan</a>
        </div>
      </div>
    }
    {
      sliderState.image &&
      <div>
        <img src={sliderState.image} alt="Front" style={{ width: '500px', height: '500px', maxWidth: '500px' }} />
        <div className='pt-4 text-center text-sm opacity-30'>
        Transaction Successful <br/>
        View on <a href={sliderState.tx} className='text-blue-500' target={"_blank"} rel="noreferrer">Etherscan</a>
        </div>
      </div>
    }
    </div>
    <Link to="/soulsigns">
      <div className="mt-12 bg-white select-none text-center py-2 px-4 md:px-8 md:py-4 w-64 border-2 rounded-md border-black font-redaction cursor-pointer">
        View Soul Sign
      </div>
    </Link>
   </div>
  )
}
export default Share;