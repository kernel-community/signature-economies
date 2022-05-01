import { useState } from 'react';
import { ReactP5Wrapper } from "react-p5-wrapper";
import HighlightSketch from '../HighlightSketch';

function HighlightModal({ setModalVisible, selectedText }) {
  return (
    <div className="flex justify-center p-8 w-min my-auto rounded-lg shadow-xl bg-gray-100 ">
     
     <div className='flex flex-row gap-x-8 my-auto'>
         <div className='rounded-lg shadow-lg w-auto'>
         <ReactP5Wrapper sketch={HighlightSketch} selectedText={selectedText.toString()} />
         </div>
      
      <div className='flex flex-col font-redaction justify-between'>

        <div className='flex-grow overflow-scroll max-h-96'>
        {selectedText}
        </div>

        <div className='flex flex-row w-full justify-end gap-x-4 text-center'>
        <div onClick={() => {setModalVisible(false);}} className='w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all'>
          Cancel  
          </div>
          <div className='w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md'>
            Mint
          </div>
         
        </div>
        
      </div>
      </div>
     
     
    </div>
  );
}

export default HighlightModal;
