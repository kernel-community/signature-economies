import ExecutionButton from '../common/ExecutionButton'
import SignatureList from './SignatureList'
import { useAccount, useConnect } from 'wagmi'
import ConnectButton from '../common/ConnectButton'
import { useDisplayableAddress } from '../../hooks/useDisplayableAddress'
import useFreeSign, { useAlreadySigned, useSignatureCount, useSignatures } from '../../hooks/useFreeSign'
import shareTweet from '../../utils/twitter'

// from https://stackoverflow.com/a/9462382
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const FreeSign = () => {
  const {sigCount} = useSignatureCount()
  const {list} = useSignatures()

  return (
    <>
      <div id='free-sign' className='mx-96 bg-white rounded-md flex flex-col px-8 md:px-0 py-16 w-4/5 md:w-2/3 gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center border-2 '>
        <div className='px-2 md:px-16 text-center'>
          If you find this essay meaningful, you may join {sigCount > 0 && <span className='font-bold'>{nFormatter(sigCount, 1)}</span>} others to sign a message crafted from the entire text. This can be done freely: signed messages are just unique data which can be verified in many different ways. Your singular, iterable mark will be stored on Arweave and become a permanent part of this document's history.
        </div>
        <DisplayButtonOrMessage />
        <hr className='w-full' />
        <SignatureList list={list} />
      </div>
      <div className='pt-16' />
      <hr className='w-2/3 mx-auto' />
    </>
  )
}

const DisplayButtonOrMessage = () => {
  const { activeConnector } = useConnect()
  const toDisplay = useDisplayableAddress()
  const { isAlreadySigned } = useAlreadySigned()
  const { sign, isSigning, isError, isUploading } = useFreeSign()
  const { data } = useAccount()
  return (
    <>
      {
      !activeConnector &&
         <ConnectButton />
      }
      {
        activeConnector && !isAlreadySigned &&
        <div className='flex flex-col items-center gap-2'>
         <ExecutionButton
            exec={sign}
            selectStyle='big'
            text='Sign freely'
            loading={isSigning || isUploading}
            disabled={isSigning || isUploading || isAlreadySigned}
          />
          <div className='w-3/4 text-base'>
              If you have already signed, the signature takes about ~10 minutes to upload on Arweave. Until then,&nbsp;
              <span className='italic underline cursor-pointer' onClick={() => shareTweet(data.address)}>
                fancy a tweet?
              </span>
          </div>
        </div>
      }
      {
        isAlreadySigned &&
          <div>
            {toDisplay} has already signed the text.
          </div>
      }
      {
        isError &&
          <div>
            There was an error. Please reload and try again.
          </div>
      }
    </>
  )
}

export default FreeSign
