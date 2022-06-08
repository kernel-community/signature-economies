import { useContext } from 'react';
import { useConnect, useSigner, useProvider } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import ExecutionButton from '../common/ExecutionButton';
import ConnectButton from '../common/ConnectButton';
import { mintSelected  } from '../../utils/nft';

const Footer = () => {
  const { state, dispatch } = useContext(HighlightContext);
  const { activeConnector } = useConnect();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const isImage = !!state.image;
  const mint = async () => {
    if (!isImage) {
      // throw an error here or prompt the user to reload
      console.log("no image found. try reloading the page.");
      return;
    }
    dispatch({ type: 'loading', payload: true });
    const tx = await mintSelected({
      provider,
      signer,
      start: state.start,
      end: state.end
    });
    console.log(tx);
    dispatch({ type: 'loading', payload: false });
    dispatch({ type: 'mint', payload: {success: true, tx: tx.hash } });
  }
  return (
    <div className="flex flex-row w-full justify-center gap-x-4 text-center my-5">
      <ExecutionButton
        text='Cancel'
        exec={() => dispatch({ type: 'close' })}
        selectStyle='basic'
      />
      {
        !activeConnector ?
        <ConnectButton /> :
        <ExecutionButton
          text='Mint'
          exec={mint}
          disabled={!isImage}
        />
      }
    </div>
  )
}

export default Footer;
