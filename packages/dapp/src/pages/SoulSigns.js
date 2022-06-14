import HorizontalSpace from "../components/common/HorizontalSpace";
import { useConnect } from "wagmi";
import Main from "../layouts/Main";
import SignedOnNfts from "../components/SoulSigns/SignedOnNfts";
import AllSealedNfts from "../components/SoulSigns/AllSealedNfts";
import AllSignatureNfts from "../components/SoulSigns/AllSignatureNfts";


const SoulSigns = () => {
  const {activeConnector} = useConnect();
  return (
    <Main>
      <div className="flex flex-col gap-y-4 w-screen p-8">
        <div className='text-5xl font-redaction text-left'>
          Soul Signs
        </div>
        {
          activeConnector && (
            <>
            <SignedOnNfts />
            <HorizontalSpace />
          </>
          )
        }
        <AllSignatureNfts />
        <HorizontalSpace/>
        <AllSealedNfts />
      </div>
    </Main>
  );
  }

  export default SoulSigns;