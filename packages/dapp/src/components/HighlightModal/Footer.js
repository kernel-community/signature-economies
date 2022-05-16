import { useContext } from 'react';
import { Connector } from "../../utils/connect"
import { useConnect } from "wagmi"
import { HighlightContext } from '../../contexts/Highlight';
import { upload } from "../../utils/arweave/index";
import { Buffer } from 'buffer';

const basicButtonStyle = `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer`
const greenButtonStyle = `w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer`

const Footer = () => {
  const { state, dispatch } = useContext(HighlightContext);
  const [{ data, error }, connect] = useConnect()
  const mint = async () => {
    if (!state.image) {
      // throw an error here or prompt the user to reload
      return;
    }
    console.log(state.image);
    const image = Buffer.from(state.image.split(",")[1], "base64")
    const { id } = await upload({ data: image, contentType: 'image/png' });
    // generate metadata here
    console.log('id', id);
    // dispatch({ type: 'mint' });
  }
  return (
    <div className="flex flex-row w-full justify-center gap-x-4 text-center my-5">
    <div
      onClick={() => dispatch({ type: 'close' })}
      className={basicButtonStyle}
    >
      Cancel
    </div>
    {!data.connected && (
      <div
        className={greenButtonStyle}
        onClick={() => connect(data.connectors[Connector.INJECTED])}>
        {error && error.message && <div>Failed to connect</div>}
        Connect
      </div>
    )}
    {data.connected && (
      <div
        className={greenButtonStyle}
        onClick={mint}
      >
        Mint
      </div>
    )}
  </div>
  )
}

export default Footer;
