import { sealedNFTS } from './nft';
import { useContext } from 'react';
import { SliderContext } from '../../contexts/Slider';

// @todo change the last value dynamically based on the slider value - either image_Front_0 or _1 or _10
// the back is always the same.

const NFTShowcase = () => {
  const { state }  = useContext(SliderContext);
  return (
  <div className="flex-grow flex text-center justify-center  items-center">
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={sealedNFTS[state.selected].image_Front_10} alt="Front" />
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