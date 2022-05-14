// import { useState, useContext } from 'react';
// import { Connector } from '../web3/connect';
// import { mintSelected } from '../web3/contracts';
// import { useConnect, useProvider, useSigner } from 'wagmi';
// import { HighlightContext } from '../contexts/Highlight';



// function HighlightModal() {
//   const { state, dispatch } = useContext(HighlightContext);
//   const [{ data, error }, connect] = useConnect()
//   const provider = useProvider()
//   const [{ data: signer }] = useSigner()
//   const [json, setJson] = useState({
//       "name": "",
//       "description": "",
//       "attributes": [
//           {
//               "trait_type": "Pattern",
//               "value": "Phyllotaxis"
//           },
//           {
//               "trait_type": "Characters",
//               "value": ""
//           },
//           {
//               "trait_type": "Lucky Number",
//               "value": ""
//           },
//           {
//               "trait_type": "Attribute",
//               "value": "Signed"
//           },
//           {
//               "trait_type": "Attribute",
//               "value": "Sealed"
//           },
//           {
//               "trait_type": "Attribute",
//               "value": "Delivered"
//           }
//       ],
//       "external_url": "https://sign.kernel.community",
//       "image": ""
//   })
//   const [url, updateUrl] = useState('')



//   // const handleOnClickConfirmed = () => {
//     // // upload the image to Arweave and await the url to be returned. Store this in the JSON array
//     // // we use to describe the NFT metadata.
//     // setJson(json => ({
//     //   ...json,
//     //   name: 'Signature NFT',
//     //   description: `A unique sign of the time, selected by ${signer}, to represent increasingly significant money in this infinite game we are playing together. As you consider these unique symbols, remember that wealth truly means having enough to share.`,
//     //   // attributes[1].value: selectedText.length
//     //   // attributes[2].value: 8
//     // }))
//     // console.log(json)
//     // // Now upload the JSON
//     // // Use the resulting arweave url to mint the NFT.
//     // updateUrl('https://arweave.net/R5VjN9UOc1llzmvOYvymFmDexZmIxIkzz9n5CvyVAd8')
//   //   console.log("confirm here")
//   // }
//   const handleOnClickMint = async () => {
//     // // call signatureNft contract
//     // await mintSelected(url, provider, signer)
//     // // show some success message to the reader and close the modal
//     // dispatch({type: 'close'});
//     console.log("confirm & mint here")
//   }

// }

// export default HighlightModal;
