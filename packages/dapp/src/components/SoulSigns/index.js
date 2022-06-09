import { sealedNfts,signNfts, ownedNfts } from "./mockData";
import Card from './Card';
import HorizontalRule from "../common/HorizontalRule";
import { useConnect, useAccount } from "wagmi";

const AllSignatureNfts = () => {
  return (
    <>
    <div className='text-xl  font-redaction'>
    Signature NFTs
 </div>
 <div className='flex flex-row overflow-scroll gap-6'>
    {signNfts.map(nft => (
    <Card image={nft.image} ethAddress={nft.ethAddress} />
    ))}
 </div>
 </>
  )
}

const AllSealedNfts = () => {
  return (
    <>
    <div className='text-xl  font-redaction'>
      Sealed NFTs
    </div>
    <div className='flex flex-row overflow-scroll gap-6'>
      {sealedNfts.map(nft => (
      <Card image={nft.image} ethAddress={nft.ethAddress} />
      ))}
    </div>
    </>
  )
}

const AllOwnedNfts = () => {
  // query for currently connected address' nfts
  const {data} = useAccount();
  // don't return anything if data.address not found
  return (
    <>
    <div className='text-xl  font-redaction'>
      Your Signs
    </div>
    <div>{data.address}</div>
    <div className='flex flex-row overflow-scroll gap-6 items-center'>
      {ownedNfts.map(nft => (
      <Card image={nft.image} ethAddress={nft.ethAddress} />
      ))}
    </div>
    </>
  )
}

const SoulSigns = () => {
  const {activeConnector} = useConnect();
    return (
        <div>
        <div className="flex flex-col gap-y-4 w-screen p-8">
         <div className='text-5xl font-redaction text-left'>
            Soul Signs
         </div>
         {
           activeConnector && <AllOwnedNfts />
         }
         <HorizontalRule />
         <AllSignatureNfts />
         <HorizontalRule />
         <AllSealedNfts />
        </div>
    </div>
    );
  }

  export default SoulSigns;