import TweetIcon from "./TweetIcon";
import { useState, useEffect } from "react";
import { lookUpEns } from "../../utils/signatures";

const NftCard = ({ uri, ethAddress }) => {
  const [toDisplay, setToDisplay] = useState(ethAddress);
  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(ethAddress)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    if (ethAddress) fetch();
  }, [ethAddress])
  return(
    <>
    <div className='flex flex-col shadow-lg h-96' style={{'width': '20rem'}}>
      <iframe
        title="nft card"
        src={uri}
        className="overflow-hidden"
        id="frame"
        height={"100%"}
      >
      </iframe>
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

export default NftCard;
