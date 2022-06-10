import { sealedNfts,signNfts } from "../components/SoulSigns/mockData";
import Card from '../components/common/NftCard';
import HorizontalRule from "../components/common/HorizontalRule";
import { useConnect } from "wagmi";
import Main from "../layouts/Main";
import SignedOnNfts from "../components/SoulSigns/SignedOnNfts";

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



const SoulSigns = () => {
  const {activeConnector} = useConnect();
    return (
      <Main>
        <div className="flex flex-col gap-y-4 w-screen p-8">
         <div className='text-5xl font-redaction text-left'>
            Soul Signs
         </div>
         {
           activeConnector && (
             <>
              <SignedOnNfts />
              <HorizontalRule />
            </>
           )
         }
         <AllSignatureNfts />
         <HorizontalRule />
         <AllSealedNfts />
        </div>
      </Main>
    );
  }

  export default SoulSigns;