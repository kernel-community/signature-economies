import { useNetwork } from 'wagmi'
import etherscan from '../../utils/constants/etherscan'
import {useDisplayableAddress} from "../../hooks/useDisplayableAddress"

const Constants = require('../../utils/constants')

const { protocol, host, port } = Constants.arweave.gateway
const arweaveUrl = protocol + '://' + host + ':' + port



const AccountAddress = ({ account }) => {
  const toDisplay = useDisplayableAddress(account)
  return (toDisplay)
}

const SignatureList = ({ list }) => {
  return (
    <>
      <div className='flex flex-col gap-y-8 mx-auto text-gray-500 w-full overflow-scroll h-96'>
        {list.map((signature, index) => (
          <div className='mx-auto flex flex-row gap-x-8 justify-between w-full md:w-2/3' key={index}>
            <div className='flex flex-row gap-x-8 w-max flex-shrink-0 items-center justify-left flex-grow'>
              <p className='flex flex-grow'>
                <AccountAddress
                  account={signature.account}
                />
              </p>
              <a
                className='text-ellipsis text-gray-300 hover:text-gray-800 hidden md:block  overflow-hidden w-32 grow font-thin no-underline'
                href={arweaveUrl + '/' + signature.id}
                target='_blank'
                rel='noreferrer'
              >
                {signature.id}
              </a>
            </div>
            <div className='justify-right w-28'>
              {signature.date ?? 'pending'}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SignatureList
