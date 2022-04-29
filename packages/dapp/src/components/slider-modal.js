import { useState } from 'react';

function SliderModal({ setModalVisible }) {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="flex justify-center relative my-auto w-[800px] h-[500px] rounded-lg shadow-xl bg-slate-100 ">
     <div className='flex flex-row gap-x-8 my-auto'>
     <input type="range" defaultValue="0" min="0" max="50" step="1" className='w-96'
       onChange={(event) => setSliderValue(event.target.value)} />
       <div className='text-3xl font-redaction w-12'>${sliderValue}</div>
     </div>
     
      <div
        onClick={() => {
          setModalVisible(false);
        }}
        className="absolute top-0 right-0 m-4 text-gray-300 hover:text-gray-800 transition-all"
      >
        <svg
          width="36"
          height="36"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default SliderModal;
