import { useContext } from 'react';
import { Connector } from "../../utils/connect"
import { useConnect, useSigner, useContract } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import { upload } from "../../utils/arweave/index";
import { Buffer } from 'buffer';
import { generate } from '../../utils/eth/metadata';
import { addresses, abis } from '../../utils/eth/constants';

const basicButtonStyle = `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer`
const greenButtonStyle = `w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer`

// @todo
const greenButtonDisabledStyle = `w-32 px-4 py-2 bg-gray-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-wait`

const Footer = () => {
  const { state, dispatch } = useContext(HighlightContext);
  const {
    activeConnector,
    connect,
    connectors,
    error,
  } = useConnect();
  const { data: signer } = useSigner();
  const signatureNFTContract = useContract({
    addressOrName: addresses(1337).signatureNFT, // @todo - need a better way to manage this, the chainid from provider will be a promise, and probably can't be used here
    contractInterface: abis.signatureNFT,
    signerOrProvider: signer,
  })

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
    const tokenId = (await signatureNFTContract.tokenIdCounter()).toString();
    const metadata = generate(tokenId, imageUrl, state.text.length);
    const { arUrl: metadataUrl } = await upload({
      data: JSON.stringify(metadata),
      contentType: 'text/plain'
    });

    console.log(metadataUrl);

    // mint nft
    await signatureNFTContract.mintSelected(metadataUrl);
  }
  return (
    <div className="flex flex-row w-full justify-center gap-x-4 text-center my-5">
    <div
      onClick={() => dispatch({ type: 'close' })}
      className={basicButtonStyle}
    >
      Cancel
    </div>
    {!activeConnector ? (
      <div
        className={greenButtonStyle}
        onClick={() => connect(connectors[Connector.INJECTED])}>
        {error && error.message && <div>Failed to connect</div>}
        Connect
      </div>
    ) : (
      <div
      className={isImage ? greenButtonStyle : greenButtonDisabledStyle}
      onClick={mint}
      disabled={!isImage}
      >
        Mint
      </div>
      )
    }
  </div>
  )
}

export default Footer;
