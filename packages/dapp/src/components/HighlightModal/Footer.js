import { useContext } from 'react';
import { useConnect, useSigner, useProvider } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import { generate } from '../../utils/metadata';
import ExecutionButton from '../common/ExecutionButton';
import ConnectButton from '../common/ConnectButton';
import { mintSelected, ownerOf  } from '../../utils/contracts';
import { upload, sign } from "../../utils/server";
import { defaultAbiCoder, keccak256 } from 'ethers/lib/utils';

const Footer = () => {
  const { state, dispatch } = useContext(HighlightContext);
  const { activeConnector } = useConnect();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const isImage = !!state.image;
  const mint = async () => {
    if (!isImage) {
      // throw an error here or prompt the user to reload
      return;
    }
    const image = state.image.split(",")[1]
    // call server to upload image
    const { arUrl: imageUrl } = (await upload({
        data: image,
        contentType: 'image/png'
      })).data;

    // generate hash of selected text
    const hash = keccak256(defaultAbiCoder.encode(['string'],[state.text]));

    // generate metadata with image + hash of text
    const metadata = generate(hash, imageUrl, state.text.length);

    // call server to upload metadata
    const { arUrl: metadataUrl } = (await upload({
        data: JSON.stringify(metadata),
        contentType: 'text/plain'
      })).data;

    // call server to sign on metadata's url
    const { signature, id } = (await sign({ arUrl: metadataUrl })).data;

    await mintSelected({
      url: metadataUrl,
      provider,
      signer,
      id,
      signature
    });

    const owner = await ownerOf(provider, id);

    // @todo remove
    console.log(`new owner of token id ${id}: ${owner}`);
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
