import { sealedNFTS } from './nft';
import { useContext, useState } from 'react';
import { SliderContext } from '../../contexts/Slider';

const NFTShowcase = () => {
  const { state }  = useContext(SliderContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  return (
  <div className="flex-grow flex text-center justify-center  items-center">
    <div className="flip-card" onClick={handleFlip}>
      <div className={isFlipped ? "flip-card-inner-flipped" : "flip-card-inner"}>
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