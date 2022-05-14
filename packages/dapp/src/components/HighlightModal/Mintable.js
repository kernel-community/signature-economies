import { ReactP5Wrapper } from 'react-p5-wrapper';
import HighlightSketch from '../highlight-sketch';
import { HighlightContext } from '../../contexts/Highlight';
import { useContext } from 'react';
const Mintable = () => {
  const {state, dispatch} = useContext(HighlightContext);
  const getReady = (img) => dispatch({ type: 'ready', payload: img });
  return (
    <div className="relative rounded-lg shadow-lg w-auto h-auto" id ="nft">
    <div className="absolute z-50 text-[#BBBBBB]/80 flex flex-col h-1/3 bottom-0 w-full font-syne text-sm text-left px-4">
      <div className="flex-grow w-full border-y border-[#BBB]/20 max-h-full flex text-justify items-center">
        {state.text}
      </div>
      <div className="flex flex-row items-center text-[#BBB]/60 justify-between h-12 text-lg">
        <div>Kernel Verses</div>
        <div>Signature Economies</div>
      </div>
    </div>
    <div className="absolute w-full h-1/3 bottom-0 blur-sm bg-transparent backdrop-blur-sm"></div>
    {!state.image && <ReactP5Wrapper
      sketch={HighlightSketch}
      selectedText={state.text}
      handleFinishedDrawing={getReady}
    />}
    {
      state.image && <img src={state.image} alt="" style={{width: '500px', height: '750px', 'max-width': '500px'}}/>
    }
    </div>
  )
}

export default Mintable;