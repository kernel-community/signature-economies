import { useState } from 'react';
import { Connector } from '../web3/connect';
import { createSign } from '../web3/contracts';
import { useConnect, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';

import Front_1A from '../images/sealedNfts/1A-Front.png';
import Back_1A from '../images/sealedNfts/1A-Back.png';
import Front_2A from '../images/sealedNfts/2A-Front.png';
import Back_2A from '../images/sealedNfts/2A-Back.png';
import Front_3A from '../images/sealedNfts/3A-Front.png';
import Back_3A from '../images/sealedNfts/3A-Back.png';
import Front_4A from '../images/sealedNfts/4A-Front.png';
import Back_4A from '../images/sealedNfts/4A-Back.png';
import Front_5A from '../images/sealedNfts/5A-Front.png';
import Back_5A from '../images/sealedNfts/5A-Back.png';
import Front_6A from '../images/sealedNfts/6A-Front.png';
import Back_6A from '../images/sealedNfts/6A-Back.png';
import Front_7A from '../images/sealedNfts/7A-Front.png';
import Back_7A from '../images/sealedNfts/7A-Back.png';
import Front_8A from '../images/sealedNfts/8A-Front.png';
import Back_8A from '../images/sealedNfts/8A-Back.png';

const sealedNFTS = [
  {
    id: 1,
    text:
      'Everything depends on the individual human being, regardless of how small a number of like-minded people there are […] on each person...',
    imageA_Front: Front_1A,
    imageA_Back: Back_1A,
  },
  {
    id: 2,
    text:
      'Poetry, well placed, can serve up a subversive education in potent signs, drawing out what is already within so we can wake the dream into reality.',
    imageA_Front: Front_2A,
    imageA_Back: Back_2A,
  },
  {
    id: 3,
    text:
      'To give birth, to nourish, to bear and not to own, to act and not lay claim, to lead and not to rule: this is mysterious power.',
    imageA_Front: Front_3A,
    imageA_Back: Back_3A,
  },
  {
    id: 4,
    text:
      'My storehouse burned down - now nothing stands between me and the moon above.',
    imageA_Front: Front_4A,
    imageA_Back: Back_4A,
  },
  {
    id: 5,
    text: 'Empty-handed I entered into this world, Barefoot I leave it.',
    imageA_Front: Front_5A,
    imageA_Back: Back_5A,
  },
  {
    id: 6,
    text: 'Real power has nothing to do with force, control, status, or money. Real power is the persistent courage to be at ease with the unsolved and the unfinished. To be able to recognise, in the scattered graffiti of your desires, the signature of the eternal.',
    imageA_Front: Front_6A,
    imageA_Back: Back_6A,
  },
  {
    id: 7,
    text:
      'To have without possessing, do without claiming, lead without controlling: this is mysterious power.',
    imageA_Front: Front_7A,
    imageA_Back: Back_7A,
  },
  {
    id: 8,
    text:
      'To bear and not to own; to act and not lay claim; to do the work and let it go: for just letting it go is what makes it stay.',
    imageA_Front: Front_8A,
    imageA_Back: Back_8A,
  },
];

function SliderModal({ setModalVisible }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(1);

  const [{ data, error }, connect] = useConnect()
  const provider = useProvider()
  const [{ data: signer }] = useSigner()

  const handleOnClickConnect = () => {
    connect(data.connectors[Connector.INJECTED]).then((result) => {
      if (!result.error) {
        console.log(result)
      }
    })
  }

  const handleOnClickMint = async () => {
    // call signatureFund contract
    let value = ethers.utils.parseEther('0.1')
    // TODO: the selectedNFT value we pass in here must be a string, not an integer (because Solidity things).
    await createSign(selectedNFT, value, provider, signer)
    // show some success message to the reader and close the modal
    setModalVisible(false)
  }

  return (
    <div className="flex flex-col md:flex-row  relative my-auto w-full md:w-[1200px] h-screen md:h-[800px] rounded-lg shadow-xl bg-white ">
      <div className="md:flex flex-shrink-0 flex-col bg-transparent md:bg-slate-50 w-full md:w-1/3 rounded-l-lg md:h-full ">
        <div className="font-redaction pl-8 p-6 text-gray-400 text-2xl">
          Select Sealed NFT
        </div>
        <div className="flex flex-row gap-x-2 md:gap-x-0 md:flex-col md:pb-8 px-8 pr-8 md:gap-y-4 overflow-scroll">
          {sealedNFTS.map((nft, index) => {
            return selectedNFT === index ? (
              <div
                className="min-h-max w-full border-2 bg-white rounded-lg justify-center items-center flex"
                onClick={() => setSelectedNFT(index)}
              >
                <div className="text-slate-800 hidden h-32 p-2 w-full text-sm md:text-md text-left md:flex items-center font-serif">
                  {nft.thumbUrl ? (
                    <>
                      <div
                        className=""
                        style={{
                          backgroundImage: `url(${nft.thumbUrl})`,
                          height: '100%',
                          width: 'full',
                          backgroundSize: 'contain',
                          aspectRatio: 1,
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </>
                  ) : (
                    <>{nft.text}</>
                  )}
                </div>
                <div className="text-slate-800 md:hidden h-8 text-center text-sm flex justify-center items-center">
                    <>{nft.id}</>
                </div>
              </div>
            ) : (
              <div
                className="min-h-max w-full border-2 border-transparent bg-white rounded-lg justify-center items-center flex"
                onClick={() => setSelectedNFT(index)}
              >
                <div className="text-slate-400 hidden h-32 p-2 w-full text-sm md:text-md  text-left md:flex items-center font-serif">
                  {nft.thumbUrl ? (
                    <>
                      <div
                        className="opacity-50"
                        style={{
                          backgroundImage: `url(${nft.thumbUrl})`,
                          height: '100%',
                          width: 'full',
                          backgroundSize: 'contain',
                          aspectRatio: 1,
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </>
                  ) : (
                    <>{nft.text}</>
                  )}
                </div>
                <div className="text-slate-400 md:hidden h-8 w-full text-sm justify-center text-left flex items-center">
                  <>{nft.id}</>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-grow md:h-full p-8">
        <div className="flex-grow flex text-center justify-center  items-center">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={sealedNFTS[selectedNFT].imageA_Front} alt="Front" />
              </div>
              <div className="flip-card-back">
                <img src={sealedNFTS[selectedNFT].imageA_Back} alt="Back" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-300 text-sm font-redaction flex items-center justify-center">
          Hover on the image to see the back
        </div>
        <div className="px-8 h-1/6 flex mt-12 md:mt-0 flex-row my-auto gap-x-4 items-center justify-between">
          <input
            type="range"
            defaultValue="0"
            min="0"
            max="50"
            step="1"
            className=" w-full"
            onChange={(event) => setSliderValue(event.target.value)}
          />
          <div className="text-xl md:text-3xl flex justify-center items-center font-redaction w-12">
            ${sliderValue}
          </div>

          {!data.connected && (
            <div 
              className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md"
              onClick={handleOnClickConnect}>
              {error && error.message && <div>Failed to connect</div>}
              Connect
            </div>
          )}

          {data.connected && (
            <div 
              className="w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md"
              onClick={handleOnClickMint}>
              Mint
            </div>
          )}
        </div>
      </div>

      <div
        onClick={() => {
          setModalVisible(false);
        }}
        className="absolute top-0 right-0 m-6 text-gray-300 hover:text-gray-800 transition-all"
      >
        <svg
          width="36"
          height="36"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default SliderModal;
