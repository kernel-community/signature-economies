import { useState, useEffect } from 'react'
import { sealedNFTS } from '../SliderModal/nft'
import Card from '../../layouts/Card'
import { useProvider } from 'wagmi'
import { addresses } from '../../utils/constants'
import opensea from '../../utils/constants/opensea'
import { useDisplayableAddress } from '../../hooks/useDisplayableAddress'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from "../HighlightModal/Canvas"
import Text from "../text"

const numberToIndex = (i) => {
  switch (i) {
    case 'one': return 0
    case 'two': return 1
    case 'three': return 2
    case 'four': return 3
    case 'five': return 4
    case 'six': return 5
    case 'seven': return 6
    case 'eight': return 7
    default: throw new Error('invalid number')
  }
}

// selectmeta = X/Y
// X is numerical - shape
// Y is words - planet (color)
const getImageSrc = (selectMeta) => {
  if (!selectMeta) return '#'
  const [shape, planet] = selectMeta.split('/')
  const image = 'image_Front_' + shape
  return sealedNFTS[numberToIndex(planet)][image]
}

const NftCard = ({
  selectMeta,
  ethAddress,
  id,
  isSeal = false,
  isCanvas = false,
  start = undefined,
  end = undefined,
  showAddress = true
}) => {
  const provider = useProvider()
  const [imgSrc, setImageSrc] = useState()
  const [url, setUrl] = useState()
  const [text, setText] = useState('')

  const toDisplay = useDisplayableAddress(ethAddress)

  useEffect(() => {
    if (!isSeal) return
    setImageSrc(getImageSrc(selectMeta))
  }, [selectMeta, isSeal])

  useEffect(() => {
    if (!isCanvas) return
    if ((start && end) || (start === 0 && end)) {
      const text = Text.substring(start, end)
      setText(text)
    }
  }, [start, end, isCanvas])

  useEffect(() => {
    const f = async () => {
      const { chainId } = await provider.getNetwork()
      const { signatureFund, signatureNFT } = addresses(chainId)
      const openseaUrl = opensea.chainIdToUrl(chainId)
      if(isSeal) setUrl(`${openseaUrl}/${signatureFund}/${id}`)
      if(isCanvas) setUrl(`${openseaUrl}/${signatureNFT}/${id}`)
    }
    f()
  }, [id, provider, isSeal, isCanvas])

  if (isSeal) {
    return (
      <Card toDisplay={toDisplay} url={url} showAddress={showAddress}>
        <img src={imgSrc} alt='Front' className='max-w-[14rem]' />
      </Card>
    )
  }

  if (isCanvas) {
    return (
      <Card toDisplay={toDisplay} url={url} showAddress={showAddress}>
        <ReactP5Wrapper
          sketch={Canvas}
          selectedText={text}
        />
      </Card>
    )
  }
}

export default NftCard
