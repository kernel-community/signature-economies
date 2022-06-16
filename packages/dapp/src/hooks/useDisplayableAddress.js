import { useState, useEffect } from "react";
import { useAccount, useProvider } from "wagmi";
import { lookUpEns } from "../utils/signatures";

export const useDisplayableAddress = () => {
  const [toDisplay, setToDisplay] = useState();
  const provider = useProvider();
  const { data, isError } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(data?.address, provider)
      if (lookup?.length > 15) lookup = lookup.substring(0,8) + "...";
      setToDisplay(lookup);
    }
    fetch();
  }, [data?.address, provider]);

  if (isError) { console.log("there was an error in fetching accounts") }
  return toDisplay;
}