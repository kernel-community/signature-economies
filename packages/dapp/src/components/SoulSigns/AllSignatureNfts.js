import { useEffect, useState } from "react";
import { highlightNfts } from "../../utils/fetchNfts";
import Card from "../common/NftCard";

const AllSignatureNfts = () => {
  const [signNfts, setSignNfts] = useState([]);
  useEffect(() => {
    const f = async () => {
      setSignNfts(await highlightNfts());
    }
    f();
  }, []);
  return (
    <>
      <div className='text-xl font-redaction'>
      Signature NFTs
      </div>
      <div className='flex flex-row overflow-scroll gap-6'>
        {signNfts.map((nft, k) => (
        <Card uri={nft.uri} ethAddress={nft.steward} key={k} />
        ))}
      </div>
    </>
  )
}

export default AllSignatureNfts;
