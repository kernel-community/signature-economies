import Box from "./core/Box";
import Button from './core/Button';
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {DisplayedError} from "./Sign";
import TwitterIconBlack from "./core/icons/TwitterIconBlack";

const generateTweet = (sig) => {
  const str = `I am verifying for @verses_xyz: sig:${sig}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
}

export default function SocialProofPopup({ setStage, formData, sign }) {
  const [loading, setIsLoading] = React.useState(false);
  const [displayedError, setDisplayedError] = React.useState(false);

  const wrappedSign = () => {
    setIsLoading(true)
    sign()
      .then((signatureServerResponse) => {
        setStage(3)
        setIsLoading(false);
      })
      .catch((err) => {
        setDisplayedError(err.message);
        setIsLoading(false);
      })
  }

  return (
    <Box
      title={<p className="text-center"> Verify your signature </p>}
      includeBorder={false}
      content={
        <div className="mt-8 mb-6">
          <p className="font-mono">
            Tweet a message to prove that you control this address. Return to this page afterwards to complete verification. 
           </p>

           <div className="mt-12 mb-5 text-center">
            <Button primary
            onClick={() => {
              if (formData.handle === "") {
                setDisplayedError("Please add a handle to verify on Twitter. Click outside this modal to go back.")
                return
              }
              generateTweet(formData.sig)
              setStage(2)
            }}>
              <TwitterIconBlack/>
              Post proof
            </Button>
          </div>
          <div className="text-center">
            <button className="font-mono underline font-light text-gray-400" onClick={wrappedSign}>{loading ? <ScaleLoader color="black" height={12} width={3}/> : 'Sign without verifying'}
            </button>
          </div>
          <DisplayedError displayedError={displayedError}/>
        </div>}
    />
  );
  }