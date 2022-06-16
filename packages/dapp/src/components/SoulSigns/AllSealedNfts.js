import { useEffect, useState } from 'react'
import { sealedNfts } from '../../utils/fetchNfts'
import Card from './SealedNftCard'

const AllSealedNfts = () => {
  const [sealNfts, setSealNfts] = useState([])
  useEffect(() => {
    const f = async () => {
      setSealNfts(await sealedNfts())
    }
    f()
  }, [])
  return (
    <>
      <div className='text-xl  font-redaction'>
        Sealed NFTs
      </div>
      <div className='flex flex-row overflow-scroll gap-6'>
        {sealNfts.map((nft, k) => (
          <Card selectMeta={nft.selectMeta} ethAddress={nft.steward} key={k} id={nft.id} />
        ))}
      </div>
    </>
  )
}
export default AllSealedNfts
