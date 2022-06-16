import { useEffect, useState } from 'react'
import { highlightNfts } from '../../utils/fetchNfts'
import Card from './SignatureNftCard'

const AllSignatureNfts = () => {
  const [signNfts, setSignNfts] = useState([])
  useEffect(() => {
    const f = async () => {
      setSignNfts(await highlightNfts())
    }
    f()
  }, [])
  return (
    <>
      <div className='text-xl font-redaction'>
        Signature NFTs
      </div>
      <div className='flex flex-row overflow-scroll gap-6'>
        {signNfts.map((nft, k) => (
          <Card start={nft.start} end={nft.end} ethAddress={nft.steward} id={nft.id} key={k} />
        ))}
      </div>
    </>
  )
}

export default AllSignatureNfts
