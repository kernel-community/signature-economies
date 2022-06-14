import { useState, useEffect } from "react";
import { lookUpEns } from "../../utils/signatures";
import TweetIcon from "../common/TweetIcon";
import { sealedNFTS } from "../SliderModal/nft";

const numberToIndex = (i) => {
  switch(i) {
    case "one": return 0;
    case "two": return 1;
    case "three": return 2;
    case "four": return 3;
    case "five": return 4;
    case "six": return 5;
    case "seven": return 6;
    case "eight": return 7;
    default: throw new Error("invalid number");
  }
}

// selectmeta = X/Y
// X is numerical - shape
// Y is words - planet (color)
const getImageSrc = (selectMeta) => {
  if (!selectMeta) return "#";
  const [shape, planet] = selectMeta.split("/");
  const image = `image_Front_` + shape;
  return sealedNFTS[numberToIndex(planet)][image];
}
const SealedNftCard = ({ selectMeta, ethAddress }) => {
  const [toDisplay, setToDisplay] = useState(ethAddress);
  const [imgSrc, setImageSrc] = useState()

  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(ethAddress)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    if (ethAddress) fetch();
  }, [ethAddress])

  useEffect(() => {
    setImageSrc(getImageSrc(selectMeta));
  }, [selectMeta]);
  return(
    <>
    {/*
      this is a hack
      height is +50px from canvas (defined in App.css) & width is same as canvas
    */}
    <div className='flex flex-col shadow-lg h-[250px] w-[200px] signatures'>
      <img src={imgSrc} alt="Front" height={"200px"} />
      <div className='flex flex-row w-full justify-between items-center h-12 p-2 border-t-0 shadow-xl border-2'>
        <div className='text-black/60 font-redaction'>
        {toDisplay}
        </div>
        <div>
        <TweetIcon />
        </div>
      </div>
    </div>
    </>
  );
}

export default SealedNftCard;