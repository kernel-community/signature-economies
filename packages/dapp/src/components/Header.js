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
      <div className="pl-6 flex flex-row">
        <Link to="/"
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/' ? 'text-black' : 'text-gray-400'}`}>
          <div>
            start
          </div>
        </Link>
        <div>
          &nbsp;|&nbsp;
        </div>
        <Link to="/essay"
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/essay' ? 'text-black' : 'text-gray-400'}`}>
          <div>
            sign
          </div>
        </Link>
        <div className="">
          &nbsp;|&nbsp;
        </div>
        <Link to="/signatures"
          className={`cursor-pointer hover:text-black no-underline ${pathname === '/signatures' ? 'text-black' : 'text-gray-400'}`}>
          <div>
            explore
          </div>
        </Link>
      </div>
      <div className="pr-6">
        {toDisplay && "signing as " + toDisplay}
      </div>
    </div>
  )
}

export default Header;
