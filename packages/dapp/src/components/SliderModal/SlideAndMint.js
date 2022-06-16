import { useContext } from 'react';
import { createSign } from '../../utils/contracts';
import { useConnect, useProvider, useSigner } from 'wagmi';
import { SliderContext } from '../../contexts/Slider';
import ExecutionButton from "../common/ExecutionButton";
import ConnectButton from '../common/ConnectButton';
import NFTShowcase from './NFTShowcase';
import NFTList from './NFTList';
import SliderInput from './SliderInput';
import CloseButton from "./CloseButton";
import Wait from '../common/Wait';
import Share from '../common/Share';

const Left = () => {
  return (
    <div className="md:flex flex-shrink-0 flex-col bg-transparent md:bg-gray-50 w-full md:w-1/3 rounded-l-lg md:h-full ">
    <div className="font-redaction pl-8 p-6 text-gray-400 text-2xl">
      Select Sealed NFT
    </div>
    <div className="flex flex-row gap-x-2 md:gap-x-0 md:flex-col md:pb-8 px-8 pr-8 md:gap-y-4 overflow-scroll">
      <NFTList />
    </div>
  </div>
  )
}

const Description = () => {
  return (
    <div className="text-gray-600 text-center text-sm block md:pb-16 font-garamond mx-auto w-2/3">
    <p className='pb-2'>
      Each seal signifies a planet and is inscribed with one of the quotes found in this essay.
    </p>
    <p className='pb-2'>
      There's more music of the spheres in the interplanetary metadata too...
    </p>
    <p className='pb-2'>
      Click on the image to explore the guiding star for this unique symbol.
    </p>
  </div>
  )
}

const indexToNumber = (i) => {
  switch (i) {
    case 1: return "one";
    case 2: return "two";
    case 3: return "three";
    case 4: return "four";
    case 5: return "five";
    case 6: return "six";
    case 7: return "seven";
    case 8: return "eight";
    default: throw new Error("invalid number");
  }
}

const Minter = () => {
  const { state, dispatch }  = useContext(SliderContext);
  const { activeConnector } = useConnect();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const handleOnClickMint = async () => {
    dispatch({ type: 'loading' });
    let tx;
    try {
      tx = await createSign({
        value: state.input.toString(),
        token: indexToNumber(state.selected + 1),
        provider,
        signer
      })
    } catch (err) {
      console.log(err);
      dispatch({ type: 'mint', payload: { success: false, tx: undefined } });
      dispatch({ type: 'error', payload: true })
      return;
    }
    dispatch({ type: 'mint', payload: { success: true, tx: tx.hash } });
  }
  return (
    <>
    <Left />
    <div className="flex flex-col md:flex-grow md:h-full p-8">
      <NFTShowcase />
      <Description />
      <div className='flex flex-col gap-y-12 md:flex-row justify-center items-center'>
        <SliderInput />
        {
          activeConnector ?
          <ExecutionButton exec={handleOnClickMint} isError={state.error} /> : <ConnectButton />
        }
      </div>
    </div>
    </>
  )
}

const SlideAndMint = () => {
  const { state }  = useContext(SliderContext);
  if (state.loading) {
    return <Wait />
  } else if (state.mint) {
    return <Share />
  } else {
    return (
      <div className="flex flex-col md:flex-row  relative my-auto w-full md:w-[1200px] h-screen md:h-[800px] rounded-lg shadow-xl bg-white ">
        <Minter />
        <CloseButton />
      </div>
    );
  }
}

export default SlideAndMint;
