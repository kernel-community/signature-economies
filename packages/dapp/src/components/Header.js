import { useLocation, Link } from 'react-router-dom'
import { useNetwork } from 'wagmi'
import { useDisplayableAddress } from '../hooks/useDisplayableAddress'
import ConnectButton from './common/ConnectButton'

const Header = () => {
  const toDisplay = useDisplayableAddress()
  const { activeChain } = useNetwork()

  return (
    <>
    {/* DESKTOP NAVBAR */}
    <div className='
        sm:flex flex-row text-gray-800 w-full pt-6 text-lg font-redaction justify-between
        pl-6 gap-2 mx-auto
        hidden
      '>
       <Items />
      <div className='
        text-gray-400
        pr-6 flex flex-row gap-1 items-center
      '>
        {
          toDisplay &&
            (
              <>
                <span>signing as</span>
                <span className='hover:text-black'>{toDisplay}</span>
                <span>on</span>
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

    {/* MOBILE NAVBAR */}
    <div className='sm:hidden flex flex-col font-redaction text-xs w-full'>
    <div className='
      flex flex-row justify-between font-redaction pt-6 w-full px-4
    '>
      <div className='flex flex-col'>
        <div>Signature</div><div>Economies</div>
      </div>
      <div>
        <Items />
      </div>
      {
          toDisplay &&
            (
              <div className='flex flex-col'>
                <span className='hover:text-black'>{toDisplay}</span>
                <span className='hover:text-black'>{activeChain?.name}</span>
              </div>
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
    </>
  )
}

const Items = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-row gap-2'>
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
  )
}

export default Header
