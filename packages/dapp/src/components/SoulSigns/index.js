import { sealedNfts,signNfts,userETHAddress } from "./mockData";
import Card from './Card';

const SoulSigns = () => {
    return (
        <div>
        <div className="flex flex-col gap-y-4 w-screen p-8">
         <div className='text-5xl font-redaction text-left'>
            Soul Signs
         </div>
         <div className='text-xl  font-redaction'>
            Signature NFTs
         </div>
         <div className='flex flex-row w-full justify-between'>
            {signNfts.map(nft => (
            <Card image={nft.image} ethAddress={nft.ethAddress} userAddress={userETHAddress}/>
            ))}
    
         </div>
         <div className='w-full border my-4'/>
         <div className='text-xl  font-redaction'>
            Sealed NFTs
         </div>
         <div className='flex flex-row w-full justify-between'>
            {sealedNfts.map(nft => (
            <Card image={nft.image} ethAddress={nft.ethAddress} userAddress={userETHAddress}/>
            ))}
         </div>
        </div>
    </div>
    );
  }
  
  export default SoulSigns;