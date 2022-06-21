import HorizontalSpace from '../components/common/HorizontalSpace'
import { useConnect } from 'wagmi'
import Main from '../layouts/Main'
import SignedOnNfts from '../components/SoulSigns/SignedOnNfts'
import NftCard from '../components/SoulSigns/NftCard'
import { useEffect, useState } from 'react'
import { highlightNfts, sealedNfts } from '../utils/fetchNfts'
import opensea from '../utils/constants/opensea'


const SoulSigns = () => {
  const { activeConnector } = useConnect()
  const [signatures, setSignatures] = useState([])
  const [seals, setSeals] = useState([])
  const [chainId, setChainId] = useState();

  useEffect(() => {
    const f = async () => {
      setChainId(await activeConnector.getChainId())
    }
    if(activeConnector) f();
  }, [activeConnector])

  useEffect(() => {
    const f = async() => {
      setSignatures(await highlightNfts())
      setSeals(await sealedNfts())
    }
    f()
  }, [])
  return (
    <Main>
      <div className='flex flex-col gap-y-4 p-8'>
        <div className='text-5xl font-redaction text-left'>
          Soul Signs
        </div>
        <div className='text-lg font-garamond'>
          We display only a selection of signs here. Follow the links to view them all.
        </div>
        {
          activeConnector && (
            <>
              <SignedOnNfts />
              <div className='self-start w-32'>
                <PersonalView
                  url={"https://opensea.io/account"}
                  text="Your NFTs"
                />
              </div>
              <HorizontalSpace />
            </>
          )
        }
        {/* ALL HIGHLIGHT NFTS */}
        <div className='text-xl font-redaction'>
          Signature NFTs
        </div>
        <div className='flex flex-row overflow-y-visible overflow-x-scroll gap-6'>
          {
            signatures.map((nft, k) => (
              <NftCard
                start={nft.start}
                end={nft.end}
                ethAddress={nft.steward}
                id={nft.id}
                key={k}
                isCanvas
              />
            ))
          }
          <ViewMore
            url={opensea.chainIdToCollectionSlug(chainId).sig}
            text="View collection on Opensea"
          />
        </div>
        <HorizontalSpace />
        {/* ALL SEAL NFTS */}
        <div className='text-xl  font-redaction'>
          Sealed NFTs
        </div>
        <div className='flex flex-row overflow-scroll gap-6'>
          {
            seals.map((nft, k) => (
              <NftCard
                selectMeta = {nft.selectMeta}
                ethAddress = {nft.steward}
                key = {k}
                id = {nft.id}
                isSeal
              />
            ))
          }
          <ViewMore
            url={opensea.chainIdToCollectionSlug(chainId).seals}
            text="View collection on Opensea"
          />
        </div>
      </div>
    </Main>
  )
}

const PersonalView = ({url, text}) => {
  return (
    <a className='
    py-2 px-6 rounded-lg hover:border-slate-300 flex flex-row items-center gap-2 border-2 border-slate-200 no-underline font-garamond font-normal
    ' href={url} target="_blank" rel='noreferrer'>
        {text}
    </a>
  )
}

const ViewMore = ({url, text}) => {
  return (
    <a className='
      text-center no-underline font-garamond font-normal bg-gray-100 rounded-lg min-w-[14rem] max-w-[14rem] scale-95 hover:scale-100 ease-in-out duration-200 flex flex-row items-center cursor-pointer text-xl
    ' href={url} target="_blank" rel='noreferrer'>
      <div className='mx-10'>
        {text}
      </div>
    </a>
  )
}

export default SoulSigns
