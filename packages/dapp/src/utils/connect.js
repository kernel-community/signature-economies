import { allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'
import { INFURA_ID as infuraId } from './constants'

// only rinkeby
const chains = allChains.filter(c => c.id === 1)

export const connectors = () => [
  new InjectedConnector({ chains })
]

export const Connector = {
  INJECTED: 0,
  WALLETCONNECT: 1
}

export const provider = ({ chainId }) => {
  if (chainId === 1337) {
    return new providers.JsonRpcProvider('http://localhost:8545')
  }
  return new providers.InfuraProvider(chainId, infuraId)
}

export const connectorStorageKey = 'sign.kernel.community'
