import { SliderContext } from '../../contexts/Slider';
import { useContext } from 'react';

const CloseButton = () => {
  const { dispatch }  = useContext(SliderContext);
  return (
    <div
        onClick={() => dispatch({ type: 'close' })}
        className="absolute top-0 right-0 m-6 text-gray-300 hover:text-gray-800 transition-all cursor-pointer"
      >
      <svg
        width="36"
        height="36"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
export default CloseButton;