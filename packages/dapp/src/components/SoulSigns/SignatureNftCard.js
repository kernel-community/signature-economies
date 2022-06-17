import { useState, useEffect } from 'react'
import { lookUpEns } from '../../utils/signatures'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from '../HighlightModal/Canvas'
import Text from '../text'
import Card from '../../layouts/Card'
import { useProvider } from 'wagmi'
import { addresses } from '../../utils/constants'
import opensea from '../../utils/constants/opensea'

const SignatureNftCard = ({ start, end, ethAddress, id }) => {
  const provider = useProvider()
  const [toDisplay, setToDisplay] = useState(ethAddress.substring(0, 8) + '...')
  const [text, setText] = useState('')
  const [url, setUrl] = useState()

  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(ethAddress)
      if (lookup.length > 15) lookup = lookup.substring(0, 8) + '...'
      setToDisplay(lookup)
    }
    if (ethAddress) fetch()
  }, [ethAddress])

  useEffect(() => {
    if ((start && end) || (start === 0 && end)) {
      const text = Text.substring(start, end)
      setText(text)
    }
  }, [start, end])

  useEffect(() => {
    const f = async () => {
      const { chainId } = await provider.getNetwork()
      const { signatureNFT } = addresses(chainId)
      const openseaUrl = opensea.chainIdToUrl(chainId)
      if (signatureNFT) {
        setUrl(`${openseaUrl}/${signatureNFT}/${id}`)
      }
    }
    f()
  }, [id, provider])

  return (
    <>
      {/*
      this is a hack
      height is +50px from canvas (defined in App.css) & width is same as canvas
    */}
      <Card toDisplay={toDisplay} url={url}>
        <ReactP5Wrapper
          sketch={Canvas}
          selectedText={text}
        />
      </Card>
    </>
  )
}

export default SignatureNftCard
