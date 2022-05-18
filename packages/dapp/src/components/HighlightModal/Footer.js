import { useContext } from 'react';
import { useConnect, useSigner, useProvider } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import { upload } from "../../utils/arweave/index";
import { Buffer } from 'buffer';
import { generate } from '../../utils/eth/metadata';
import ExecutionButton from '../common/ExecutionButton';
import ConnectButton from '../common/ConnectButton';
import { mintSelected, nextTokenId } from '../../utils/eth/contracts';

const Footer = () => {
  const { state, dispatch } = useContext(HighlightContext);
  const {activeConnector} = useConnect();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const isImage = !!state.image;
  const mint = async () => {
    if (!isImage) {
      // throw an error here or prompt the user to reload
      return;
    }

    // fetch and upload image
    const image = Buffer.from(state.image.split(",")[1], "base64")
    const { arUrl: imageUrl } = await upload({ data: image, contentType: 'image/png' });

    // fetch, generate and upload metadata
    const tokenId = nextTokenId(provider);
    const metadata = generate(tokenId, imageUrl, state.text.length);
    const { arUrl: metadataUrl } = await upload({
      data: JSON.stringify(metadata),
      contentType: 'text/plain'
    });

    console.log(metadataUrl);

    // mint nft
    await mintSelected(metadataUrl, provider, signer);
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
