import { SwitchNetworkContext } from '../contexts/SwitchNetwork'
import { useContext } from 'react'
import { useNetwork } from 'wagmi'
import Spinner from './common/Spinner'
import Modal from '../layouts/Modal'

const SwitchNetworkModal = () => {
  const { state } = useContext(SwitchNetworkContext)
  const { chains, switchNetwork, activeChain, isLoading, pendingChainId } = useNetwork()
  if (!state.modal) return
  return (
    <Modal bringToFront>
        <div className='p-8 w-full h-min-content sm:w-80 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg backdrop-blur-lg'>
          <div>
            Please switch to&nbsp;
          </div>
          <div className='flex flex-col gap-2'>
            {chains.map((x) => (
              <button
                disabled={!switchNetwork || x.id === activeChain?.id}
                key={x.id}
                onClick={() => switchNetwork?.(x.id)}
                className={`
                py-2 px-6 bg-slate-200 rounded-lg hover:bg-slate-300 flex flex-row items-center gap-2
              `}
              >
                <div className='grow'>
                  {x.name}
                </div>
                {
                isLoading && pendingChainId === x.id && (
                  <Spinner />
                )
              }
              </button>
            ))}
            <div>
              If the button doesn't work, try switching the provider manually in your wallet.
            </div>
          </div>
        </div>
    </Modal>
  )
}

export default SwitchNetworkModal
