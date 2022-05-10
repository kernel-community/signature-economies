import { ReactP5Wrapper } from 'react-p5-wrapper';
import HighlightSketch from '../HighlightSketch';

function HighlightModal({ setModalVisible, selectedText }) {
  return (
    <div className="flex justify-center md:p-8 w-full h-full md:h-auto md:w-min my-auto rounded-lg shadow-xl bg-white ">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="relative rounded-lg shadow-lg w-auto h-auto">
          <div className="absolute z-50 text-[#110242] flex flex-col h-1/3 bottom-0 w-full font-redaction text-sm text-center p-4">
            <div className="flex-grow w-full max-h-full flex  items-center">
              {selectedText}
            </div>
            <div className="font-bold flex items-center justify-center h-12 text-lg">
              Signature Economies
            </div>
          </div>
          <div className="absolute w-full h-1/3 bottom-0 bg-white border-y-8 border-[#8C65F7]"></div>
          <ReactP5Wrapper
            sketch={HighlightSketch}
            selectedText={selectedText.toString()}
          />
        </div>

        <div className="flex flex-col font-redaction justify-between">
          {/* <div className='flex-grow overflow-scroll max-h-96'>
        {selectedText}
        </div> */}

          <div className="flex flex-row w-full justify-end gap-x-4 text-center">
            <div
              onClick={() => {
                setModalVisible(false);
              }}
              className="w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all"
            >
              Cancel
            </div>
            <div className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md">
              Mint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightModal;
