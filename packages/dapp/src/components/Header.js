import { useAccount, useProvider } from "wagmi";
import { lookUpEns } from "../utils/signatures";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const { data, isError } = useAccount();
  const provider = useProvider();
  const [toDisplay, setToDisplay] = useState();
  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(data?.address, provider)
      if (lookup.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    fetch();
  }, [data?.address, provider]);
  if (isError) { console.log("there was an error in fetching accounts") }
  return (
    <div className="flex flex-row text-gray-800 w-full pt-6 text-lg font-redaction justify-between">
      {
        pathname === "/" &&
        <Link to="/essay" className="cursor-pointer no-underline hover:text-black text-gray-500 pl-6">
          <div>
            essay
          </div>
        </Link>
      }
      {
        pathname === "/essay" &&
        <Link to="/signatures" className="cursor-pointer no-underline hover:text-black text-gray-500 pl-6">
          <div>
            signatures
          </div>
        </Link>
      }
      {
        pathname === "/signatures" &&
        <Link to="/essay" className="cursor-pointer no-underline hover:text-black text-gray-500 pl-6">
          <div >
            sign
          </div>
        </Link>
      }
      <div className="pr-6">
        {toDisplay && "signing as " + toDisplay}
      </div>
    </div>
  )
}

export default Header;
