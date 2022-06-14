import { useState, useEffect } from "react";
import { lookUpEns } from "../../utils/signatures";
import { sealedNFTS } from "../SliderModal/nft";
import Card from "../../layouts/Card";
import { useProvider } from "wagmi";
import { addresses } from "../../utils/constants";
import opensea from "../../utils/constants/opensea";

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

const SealedNftCard = ({ selectMeta, ethAddress, id }) => {
  const provider = useProvider();
  const [toDisplay, setToDisplay] = useState(ethAddress);
  const [imgSrc, setImageSrc] = useState()
  const [url, setUrl] = useState();
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

  useEffect(() => {
    const f = async () => {
      const {chainId} = await provider.getNetwork();
      const {signatureFund} = addresses(chainId);
      const chainName = opensea.chainIdToName(chainId);
      if (signatureFund) {
        setUrl(`${opensea.base}/${chainName}/${signatureFund}/${id}`)
      }
    }
    f();
  }, [id, provider]);

  return(
    <Card toDisplay={toDisplay} url={url}>
      <img src={imgSrc} alt="Front" height={"200px"} />
    </Card>
  );
}

export default SealedNftCard;