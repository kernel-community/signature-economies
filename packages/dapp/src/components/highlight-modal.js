import { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import HighlightSketch from './highlight-sketch';
import { Connector } from '../web3/connect';
import { mintSelected } from '../web3/contracts';
import { useConnect, useProvider, useSigner } from 'wagmi';

// TODO: I introduced a regression where the symbols now overflow at the bottom across the text.
function HighlightModal({ setModalVisible, selectedText }) {
  const [{ data, error }, connect] = useConnect()
  const provider = useProvider()
  const [{ data: signer }] = useSigner()

  const [confirmed, isConfirmed] = useState(false)
  const [url, updateUrl] = useState('')

  const handleOnClickConnect = () => {
    connect(data.connectors[Connector.INJECTED]).then((result) => {
      if (!result.error) {
        console.log(result)
      }
    })
  }

  const handleOnClickConfirmed = () => {
    // upload the image to Arweave and await the url to be returned. Store this.
    isConfirmed(true)
    updateUrl('https://arweave.net/R5VjN9UOc1llzmvOYvymFmDexZmIxIkzz9n5CvyVAd8')
  }

  const handleOnClickMint = async () => {
    // call signatureNft contract
    await mintSelected(url, provider, signer)
    // show some success message to the reader and close the modal
    setModalVisible(false)
  }

  return (
    <div className="flex justify-center md:p-8 w-full h-full md:h-auto md:w-min my-auto rounded-lg shadow-xl bg-white ">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="relative rounded-lg shadow-lg w-auto h-auto">
          <div className="absolute z-50 text-[#BBBBBB]/80 flex flex-col h-1/3 bottom-0 w-full font-syne text-sm text-left px-4">
            <div className="flex-grow w-full border-y border-[#BBB]/20 max-h-full flex text-justify items-center">
              {selectedText}
            </div>
            <div className="flex flex-row items-center text-[#BBB]/60 justify-between h-12 text-lg">
              <div>Kernel Verses</div>
              <div>Signature Economies</div>
            </div>
          </div>
          <div className="absolute w-full h-1/3 bottom-0 blur-sm bg-transparent backdrop-blur-sm"></div>
          <ReactP5Wrapper
            sketch={HighlightSketch}
            selectedText={selectedText.toString()}
          />
        </div>

        <div className="flex flex-col font-redaction justify-between">
          <div className="flex flex-row w-full justify-end gap-x-4 text-center">
            
            <div
              onClick={() => {
                setModalVisible(false);
              }}
              className="w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all"
            >
              Cancel
            </div>

            {!data.connected && (
              <div 
                className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md"
                onClick={handleOnClickConnect}>
                {error && error.message && <div>Failed to connect</div>}
                Connect
              </div>
            )}
            
            {data.connected && !confirmed && (
              <div 
                className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md"
                onClick={handleOnClickConfirmed}>
                Confirm
              </div>
            )}
            
            {data.connected && confirmed && (
              <div 
                className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md"
                onClick={handleOnClickMint}>
                Mint
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightModal;
