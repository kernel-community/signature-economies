import { signedOn } from "./mockData";
import Card from "../common/NftCard";
import { useEffect, useState } from "react";
import { useAccount, useProvider } from "wagmi";
import { lookUpEns } from "../../utils/signatures";
import { Link } from "react-router-dom";

const SignedOnNfts = ({ account }) => {
  const {data: connectedAccount} = useAccount();
  const provider = useProvider();
  const [toFetchFor, setToFetchFor] = useState(account);
  const [toDisplay, setToDisplay] = useState(toFetchFor);

  useEffect(() => {
    if (!account) {
      setToFetchFor(connectedAccount.address)
    }
  }, [connectedAccount, account]);

  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(toFetchFor, provider)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    fetch();
  }, [toFetchFor, provider])

  console.log(toFetchFor);

  return (
    <>
    <Link to={`/signed/${toFetchFor}`} className="no-underline text-gray-600 hover:text-black">
      <div className='text-xl font-redaction'>
        Signed by&nbsp;{toDisplay}
      </div>
      </Link>
      <div className='flex flex-row overflow-scroll gap-6 items-center'>
        {signedOn.map((nft, k) => (
        <Card image={nft.image} ethAddress={nft.ethAddress} key={k} />
        ))}
      </div>
    </>
  )
}
export default SignedOnNfts;