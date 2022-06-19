import NftCard from './NftCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { stewardNfts } from '../../utils/fetchNfts'
import TweetIcon from '../common/TweetIcon'
import twitter from '../../utils/constants/twitter'
import { useDisplayableAddress } from '../../hooks/useDisplayableAddress'

const SignedOnNfts = ({ account }) => {
  const { data: connectedAccount } = useAccount()
  const toDisplay = useDisplayableAddress(account)

  const [toFetchFor, setToFetchFor] = useState(account)
  const [sealedNfts, setSealedNfts] = useState([])
  const [signatureNfts, setSignatureNfts] = useState([])

  useEffect(() => {
    if (!account) {
      setToFetchFor(connectedAccount.address)
    }
  }, [connectedAccount, account])

  useEffect(() => {
    const fetchNfts = async () => {
      const [seals, signatures] = await stewardNfts(toFetchFor)
      setSealedNfts(seals)
      setSignatureNfts(signatures)
    }
    if (toFetchFor) {
      fetchNfts()
    }
  }, [toFetchFor])

  const shareTweet = () => window.open(
    `${twitter.shareIntent}${encodeURIComponent(
      twitter.shareContent.replace('<COLLECTION_LINK>', 'https://' + window.location.hostname + '/signed/' + toFetchFor)
    )}`
  )

  if (sealedNfts.length === 0 && signatureNfts.length === 0) return <></>

  return (
    <div className='bg-gray-100 rounded-2xl p-8 sm:w-min w-full'>
      <Link to={`/signed/${toFetchFor}`} className='no-underline text-gray-600 hover:text-black'>
        <div className='text-xl font-redaction flex flex-row items-center gap-2 pb-4'>
          Signed by&nbsp;{toDisplay}
          <span onClick={shareTweet}>
            <TweetIcon />
          </span>
        </div>
      </Link>
      <div className='flex flex-col gap-4 overflow-scroll'>
        <div className='flex flex-row gap-6 items-center'>
          {sealedNfts.map((nft, k) => (
            <NftCard
              selectMeta={nft.selectMeta}
              ethAddress={nft.steward}
              key={k}
              id={nft.id}
              isSeal
              showAddress={false}
            />
          ))}
        </div>
        <div className='flex flex-row gap-6 items-center'>
          {signatureNfts.map((nft, k) => (
            <NftCard
              start={nft.start}
              end={nft.end}
              ethAddress={nft.steward}
              key={k}
              id={nft.id}
              isCanvas
              showAddress={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default SignedOnNfts
