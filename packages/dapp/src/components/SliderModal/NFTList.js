import { SliderContext } from '../../contexts/Slider';
import { useContext } from 'react';
import { sealedNFTS } from './nft';

const NFTList = () => {
  const { state, dispatch }  = useContext(SliderContext);
  const elements = sealedNFTS.map((nft, index) => {
    const isSelected = state.selected === index;
    return (
      <div
        className={
          `min-h-max w-full ${isSelected ? 'border-2' : 'border-2 border-transparent'} bg-white rounded-lg hover:border-gray-200 transition-all justify-center items-center flex cursor-pointer`
        }
        onClick={ () => dispatch({ type: 'select', payload: index }) }
        key={index}
      >
        <div className={`${isSelected ? 'text-slate-800' : 'text-slate-400'} hidden h-32 p-2 w-full text-sm md:text-md text-left hover:text-slate-800 transition-all md:flex items-center font-serif overflow-scroll`}>
            {nft.text}
        </div>
        <div className={
          `${isSelected ? 'text-slate-800' : 'text-slate-400'}
          md:hidden h-8 text-center text-sm flex justify-center items-center`
        }>
            {nft.id}
        </div>
      </div>
    );
  });
  return elements;
}
export default NFTList;