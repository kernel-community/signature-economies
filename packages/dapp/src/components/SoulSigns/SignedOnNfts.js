import SealedNftCard from "./SealedNftCard";
import SignatureNftCard from "./SignatureNftCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { lookUpEns } from "../../utils/signatures";
import { Link } from "react-router-dom";
import { stewardNfts } from "../../utils/fetchNfts";

const SignedOnNfts = ({ account }) => {
  const {data: connectedAccount} = useAccount();
  const [toFetchFor, setToFetchFor] = useState(account);
  const [toDisplay, setToDisplay] = useState(toFetchFor);
  const [sealedNfts, setSealedNfts] = useState([]);
  const [signatureNfts, setSignatureNfts] = useState([]);

  useEffect(() => {
    if (!account) {
      setToFetchFor(connectedAccount.address)
    }
  }, [connectedAccount, account]);

  useEffect(() => {
    const fetchAddress = async () => {
      let lookup = await lookUpEns(toFetchFor)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    const fetchNfts = async () => {
      const [seals, signatures] = await stewardNfts(toFetchFor);
      setSealedNfts(seals);
      setSignatureNfts(signatures);
    }
    if (toFetchFor) {
      fetchAddress();
      fetchNfts();
    }
  }, [toFetchFor])

  return (
    <>
    <Link to={`/signed/${toFetchFor}`} className="no-underline text-gray-600 hover:text-black">
      <div className='text-xl font-redaction'>
        Signed by&nbsp;{toDisplay}
      </div>
      </Link>
      <div className='flex flex-row overflow-scroll gap-6 items-center'>
        {sealedNfts.map((nft, k) => (
          <SealedNftCard selectMeta={nft.selectMeta} ethAddress={nft.steward} key={k} />
        ))}
        {signatureNfts.map((nft, k) => (
          <SignatureNftCard start={nft.start} end={nft.end} ethAddress={nft.steward} key={k} />
        ))}
      </div>
    </>
  )
}
export default SignedOnNfts;