import TweetIcon from "../common/TweetIcon";
import { useState, useEffect } from "react";
import { lookUpEns } from "../../utils/signatures";
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Canvas from "../HighlightModal/Canvas";
import Text from "../text";

const SignatureNftCard = ({ start, end, ethAddress }) => {
  const [toDisplay, setToDisplay] = useState(ethAddress);
  const [text, setText] = useState("");
  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(ethAddress)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    if (ethAddress) fetch();
  }, [ethAddress])
  useEffect(() => {
    if ((start && end) || (start === 0 && end)) {
      const text = Text.substring(start, end);
      setText(text);
    }
  }, [start, end]);
  return(
    <>
    {/*
      this is a hack
      height is +50px from canvas (defined in App.css) & width is same as canvas
    */}
    <div className='flex flex-col shadow-lg h-[330px] w-[200px] signatures'>
      <ReactP5Wrapper
          sketch={Canvas}
          selectedText={text}
        />
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

export default SignatureNftCard;