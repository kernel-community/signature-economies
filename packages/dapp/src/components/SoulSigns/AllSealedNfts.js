import { useEffect, useState } from "react";
import { sealedNfts } from "../../utils/fetchNfts";
import Card from "../common/NftCard";

const AllSealedNfts = () => {
  const [sealNfts, setSealNfts] = useState([]);
  useEffect(() => {
    const f = async () => {
      setSealNfts(await sealedNfts());
    }
    f();
  }, []);
  return (
    <>
    <div className='text-xl  font-redaction'>
      Sealed NFTs
    </div>
    <div className='flex flex-row overflow-scroll gap-6'>
      {sealNfts.map((nft, k) => (
      <Card uri={nft.uri} ethAddress={nft.steward} key={k}/>
      ))}
    </div>
    </>
  )
}
export default AllSealedNfts;
