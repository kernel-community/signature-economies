import { allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { providers } from 'ethers'

const infuraId = process.env.INFURA_ID

// only rinkeby
const chains = allChains.filter(c => c.id === 4);

export const connectors = () => [
  new InjectedConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      infuraId,
      qrcode: true,
    },
  }),
]

export const Connector = {
  INJECTED: 0,
  WALLETCONNECT: 1,
}

export const provider = ({ chainId }) => {
  if (chainId === 1337) {
    return new providers.JsonRpcProvider('http://localhost:8545')
  }
  return new providers.InfuraProvider(chainId, infuraId)
}

export const connectorStorageKey = 'sign.kernel.community'
