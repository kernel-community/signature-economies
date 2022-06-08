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
          `min-h-max w-full ${isSelected ? 'border-2' : 'border-2 border-transparent'} bg-white rounded-lg hover:border-gray-200 transition-all  cursor-pointer`
        }
        onClick={ () => dispatch({ type: 'select', payload: index }) }
        key={index}
      >
        <h1 className={`${isSelected ? 'text-slate-800' : 'text-slate-400'} hidden p-2 text-md md:text-lg text-left hover:text-slate-800 transition-all md:flex items-center font-garamond`}>
            {nft.title}
        </h1>
        <p className={`${isSelected ? 'text-slate-800' : 'text-slate-400'} hidden p-2 text-sm md:text-md text-left hover:text-slate-800 transition-all md:flex items-center font-garamond`}>
            {nft.text}
        </p>
        <p className={
          `${isSelected ? 'text-slate-800' : 'text-slate-400'}
          md:hidden text-center text-sm flex justify-center items-center`
        }>
            {nft.id}
        </p>
      </div>
    );
  });
  return elements;
}
export default NFTList;