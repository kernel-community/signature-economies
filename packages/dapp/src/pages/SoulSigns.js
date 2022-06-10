import { sealedNfts,signNfts, ownedNfts } from "../components/SoulSigns/mockData";
import Card from '../components/SoulSigns/Card';
import HorizontalRule from "../components/common/HorizontalRule";
import { useConnect, useAccount } from "wagmi";
import Main from "../layouts/Main";

const AllSignatureNfts = () => {
  return (
    <>
    <div className='text-xl  font-redaction'>
    Signature NFTs
    </div>
    <div className='flex flex-row overflow-scroll gap-6'>
      {signNfts.map((nft, k) => (
      <Card image={nft.image} ethAddress={nft.ethAddress} key={k} />
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
      {sealedNfts.map((nft, k) => (
      <Card image={nft.image} ethAddress={nft.ethAddress} key={k}/>
      ))}
    </div>
    </>
  )
}

const AllOwnedNfts = () => {
  // query for currently connected address' nfts
  // const {data} = useAccount();
  // don't return anything if data.address not found
  return (
    <>
    <div className='text-xl  font-redaction'>
      Your Signs
    </div>
    {/* <div>{data?.address}</div> */}
    <div className='flex flex-row overflow-scroll gap-6 items-center'>
      {ownedNfts.map((nft, k) => (
      <Card image={nft.image} ethAddress={nft.ethAddress} key={k} />
      ))}
    </div>
    </>
  )
}

const SoulSigns = () => {
  const {activeConnector} = useConnect();
    return (
      <Main>
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
      </Main>
    );
  }

  export default SoulSigns;