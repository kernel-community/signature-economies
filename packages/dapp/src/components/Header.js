import { useAccount, useProvider } from "wagmi";
import { lookUpEns } from "../utils/signatures";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const { data, isError } = useAccount();
  const provider = useProvider();
  const [toDisplay, setToDisplay] = useState("");
  useEffect(() => {
    const fetch = async () => {
      setToDisplay(await lookUpEns(data.address, provider));
    }
    fetch();
  }, [data.address, provider]);
  if (isError) { console.log("there was an error in fetching accounts") }
  return (
    <div className="flex flex-row text-gray-800 w-full pt-6 px-6 text-sm font-redaction justify-between">
      {
        pathname === "/" &&
        <Link to="/soulsigns" className="cursor-pointer no-underline hover:text-black text-gray-500">
          <div>
            signatures
          </div>
        </Link>
      }
      {
        pathname === "/soulsigns" &&
        <Link to="/" className="cursor-pointer no-underline hover:text-black text-gray-500">
          <div >
            sign
          </div>
        </Link>
      }
      <div>
        {toDisplay && "signing as " + toDisplay}
      </div>
    </div>
  )
}

export default Header;
