import { sealedNFTS } from './nft';
import { useContext } from 'react';
import { SliderContext } from '../../contexts/Slider';

const NFTShowcase = () => {
  const { state }  = useContext(SliderContext);
  return (
  <div className="flex-grow flex text-center justify-center  items-center">
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={state.image} alt="Front" />
        </div>
        <div className="flip-card-back">
          <img src={sealedNFTS[state.selected].image_Back} alt="Back" />
        </div>
      </div>
    </div>
  </div>
  )
}
export default NFTShowcase;