import { useLocation, Link } from 'react-router-dom'
import { useNetwork } from 'wagmi'
import { useDisplayableAddress } from '../hooks/useDisplayableAddress'
import ConnectButton from './common/ConnectButton'

const Header = () => {
  const { pathname } = useLocation()
  const toDisplay = useDisplayableAddress()
  const { activeChain } = useNetwork()

  return (
    <div className='flex flex-row text-gray-800 w-full pt-6 text-lg font-redaction justify-between'>
      <div className='pl-6 flex flex-row gap-2 mx-auto md:mx-0'>
        <Link
          to='/'
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/' ? 'text-black' : 'text-gray-400'}`}
        >
          <div>
            start
          </div>
        </Link>
        <div>
          |
        </div>
        <Link
          to='/essay'
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/essay' ? 'text-black' : 'text-gray-400'}`}
        >
          <div>
            sign
          </div>
        </Link>
        <div className=''>
          |
        </div>
        <Link
          to='/signatures'
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/signatures' ? 'text-black' : 'text-gray-400'}`}
        >
          <div>
            explore
          </div>
        </Link>
      </div>
      <div className='pr-6 flex flex-row gap-2 text-gray-400 items-center hidden md:block'>
        {
          toDisplay &&
            (
              <>
                <span>signing as</span>&nbsp;
                <span className='hover:text-black'>{toDisplay}</span>&nbsp;
                <span>on</span>&nbsp;
                <span className='hover:text-black'>{activeChain?.name}</span>
              </>
            )
        }
        {
          !activeChain &&
          (
            <ConnectButton />
          )
        }
      </div>
    </div>
  )
}

export default Header
