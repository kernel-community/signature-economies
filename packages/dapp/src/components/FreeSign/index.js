import ExecutionButton from '../common/ExecutionButton'
import SignatureList from './SignatureList'
import { useConnect, useSigner } from 'wagmi'
import ConnectButton from '../common/ConnectButton'
import signText from '../text'
import { useState, useEffect } from 'react'
import { get } from '../../utils/signatures'
import { saveSig, sigCheck, uploadToArweave } from '../../utils/arweave'
import { useDisplayableAddress } from '../../hooks/useDisplayableAddress'

const TEXT = 'If you find this essay meaningful, you may sign a message crafted from the entire text. This can be done freely: signed messages are just unique data which can be verified in many different ways. Your singular, iterable mark will be stored on Arweave and become a permanent part of this document\'s history.'

const FreeSign = () => {
  const { activeConnector } = useConnect()
  const { data: signer } = useSigner()
  const toDisplay = useDisplayableAddress()
  const [isSigning, setIsSigning] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [alreadySigned, setAlreadySigned] = useState(false)
  const [isError, setIsError] = useState(false)

  // list: {id, date, data: {account, signature}}[]
  const [list, setList] = useState([])

  const fetchSignatures = async () => {
    const signatures = await get()
    setList(signatures)
  }

  const sign = async () => {
    setIsUploading(false)
    setIsSigning(false)
    setIsSuccess(false)
    setIsError(false)
    setAlreadySigned(false)

    const signerAddress = await signer.getAddress()
    if (isSigning || isUploading) return

    setIsSigning(true)

    const { found: alreadySigned } = await sigCheck({ signer: signerAddress })
    if (alreadySigned) {
      setIsSigning(false)
      setAlreadySigned(true)
      return
    }
    let signature
    try {
      signature = await signer.signMessage(signText)
    } catch (err) {
      console.log(err)
      setIsSigning(false)
      setIsError(true)
      return
    }
    const account = await signer.getAddress()
    setIsSigning(false)
    // upload signature to arweave
    setIsUploading(true)
    let arUrl
    try {
      ({ arUrl } = (await uploadToArweave({
        data: JSON.stringify({
          signature,
          account
        }),
        contentType: 'text/plain',
        tags: [
          {
            key: 'App-Name',
            value: 'Kernel-Signature-Economies'
          }
        ]
      })))
    } catch (err) {
      console.log('WEAVER: error in uploading to arweave')
      console.log(err)
      setIsError(true)
      setIsSigning(false)
      setIsUploading(false)
      return
    }
    // save signature to weaver
    try {
      await saveSig({ signer: signerAddress, signature: arUrl })
    } catch (err) {
      console.log('WEAVER: error in saving signature')
      console.log(err)
      setIsError(true)
      setIsSigning(false)
      setIsUploading(false)
    }
    setIsUploading(false)
    setIsSigning(false)
    setIsSuccess(true)
    setIsError(false)
  }

  // fetch signatures after a successful signature submit
  useEffect(() => {
    if (isSuccess) fetchSignatures()
  }, [isSuccess])

  useEffect(() => setAlreadySigned(false), [signer])

  // fetch signatures on mount
  useEffect(() => {
    fetchSignatures()
  }, [])
  return (
    <>
      <div id='free-sign' className='mx-96 bg-white rounded-md flex flex-col px-8 md:px-0 py-16 w-4/5 md:w-2/3 gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center border-2 '>
        <div className='px-2 md:px-16 text-center'>
          {TEXT}
        </div>
        {
        !activeConnector
          ? <ConnectButton />
          : <ExecutionButton
              exec={sign}
              tween
              selectStyle='big'
              text='Sign freely'
              loading={isSigning || isUploading}
              disabled={isSigning || isUploading}
            />
      }
        {
        alreadySigned &&
          <div>
            signature for {toDisplay} already submitted.
          </div>
      }
        {
        isError &&
          <div>
            there was an error, please reload and try again.
          </div>
      }
        <hr className='w-full' />
        <SignatureList list={list} />
      </div>
      <div className='pt-16' />
      <hr className='w-2/3 mx-auto' />
    </>
  )
}

export default FreeSign
