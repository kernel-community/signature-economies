import { useContext } from 'react';
import { createSign } from '../../utils/eth/contracts';
import { useConnect, useProvider, useSigner } from 'wagmi';
import { SliderContext } from '../../contexts/Slider';
import ExecutionButton from "../common/ExecutionButton";
import ConnectButton from '../common/ConnectButton';
import NFTShowcase from './NFTShowcase';
import NFTList from './NFTList';
import SliderInput from './SliderInput';
import CloseButton from "./CloseButton";

const SlideAndMint = () => {
  const { state, dispatch }  = useContext(SliderContext);
  const { activeConnector } = useConnect();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const handleOnClickMint = async () => {
    await createSign(state.selected.toString(), provider, signer)
    // show some success message to the reader and close the modal @todo
    dispatch({ type: 'close' });
  }

  return (
    <div className="flex flex-col md:flex-row  relative my-auto w-full md:w-[1200px] h-screen md:h-[800px] rounded-lg shadow-xl bg-white ">
      <div className="md:flex flex-shrink-0 flex-col bg-transparent md:bg-slate-50 w-full md:w-1/3 rounded-l-lg md:h-full ">
        <div className="font-redaction pl-8 p-6 text-gray-400 text-2xl">
          Select Sealed NFT
        </div>
        <div className="flex flex-row gap-x-2 md:gap-x-0 md:flex-col md:pb-8 px-8 pr-8 md:gap-y-4 overflow-scroll">
         <NFTList />
        </div>
      </div>
      <div className="flex flex-col md:flex-grow md:h-full p-8">
        <NFTShowcase />
        <div className="text-gray-300 text-sm font-redaction flex items-center justify-center">
          Hover on the image to see the back
        </div>
        <div className='flex items-center'>
          <SliderInput />
          {
            activeConnector ?
            <ExecutionButton exec={handleOnClickMint} /> : <ConnectButton />
          }
        </div>

      </div>
      <CloseButton />
    </div>
  );
}

export default SlideAndMint;
