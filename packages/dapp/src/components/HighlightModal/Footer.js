import { useContext } from 'react';
import { Connector } from "../../web3/connect"
import { useConnect } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import { buttons } from "../../styles";

const Footer = () => {
  const { dispatch } = useContext(HighlightContext);
  const [{ data, error }, connect] = useConnect()
  return (
    <div className="flex flex-row w-full justify-center gap-x-4 text-center my-5">
    <div
      onClick={() => dispatch({ type: 'close' })}
      className={buttons.basic}
    >
      Cancel
    </div>
    {!data.connected && (
      <div
        className={buttons.accent}
        onClick={connect(data.connectors[Connector.INJECTED])}>
        {error && error.message && <div>Failed to connect</div>}
        Connect
      </div>
    )}
    {data.connected && (
      <div
        className={buttons.accent}
        onClick={() => dispatch({ type: 'mint' })}
      >
        Mint
      </div>
    )}
  </div>
  )
}

export default Footer;
