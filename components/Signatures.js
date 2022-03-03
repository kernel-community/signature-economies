import Box from "./core/Box";
import Checkmark from './core/icons/Checkmark';
import React from "react";
import {dedupe, fetchSignatures, sortSigs} from "../arweaveFns";

const cleanHandle = (handle, address, verified) => {
  if (verified) {
    if (handle.length === 0) {
      return handle;
    } else {
      const firstChar = handle[0];
      return firstChar === "@" ? handle : '@' + handle;
    }
  }
  return address.slice(0, 8);
}

export default function Signatures({txId, sigs, setSigs}) {
  const [cursor, setCursor] = React.useState("")
  const [sortedSigs, setSortedSigs] = React.useState([])
  const [reachedEnd, setReachedEnd] = React.useState(false)

  React.useEffect(() => {
    setCursor(sigs[sigs.length-1] && sigs[sigs.length-1].CURSOR)
    setSortedSigs(sortSigs(dedupe(sigs)))
  }, [sigs])

  const fetchMore = React.useCallback(async () => {
    const newSigs = await fetchSignatures(txId, cursor)
    if (newSigs.length === 0) {
      setReachedEnd(true)
    } else {
      setSigs(oldSigs => [...oldSigs, ...newSigs])
    }
  }, [cursor])

  return (
    <Box
      title={'Signatures'}
      content={<>
        {sortedSigs.map((sig, index) => <div className="font-mono w-full" key={sig.SIG_ADDR}>
          <div
            className={"space-x-0 flex py-4 sm:space-x-4 sm:py-2 w-auto sm:py-4 overflow-hidden" + ((index === sigs.length - 1 && reachedEnd) ? "" : " border-b border-gray-wash")}>
            <h3 className="py-2 text-left">
              {sig.SIG_HANDLE ?
                <a target="_blank" className="hover:underline"
                   href={`https://twitter.com/${sig.SIG_HANDLE}`}>{sig.SIG_NAME || 'Anonymous'}</a>
                : sig.SIG_NAME}
            </h3>
            {sig.SIG_ID && <a
              target="_blank"
              className="hidden py-2 text-gray-detail hover:underline overflow-hidden sm:inline-block"
              href={`https://arweave.net/tx/${sig.SIG_ID}`}>tx:{sig.SIG_ID.slice(0, 6)}</a>}

            <div className="flex-1"/>

            <a target="_blank" href={sig.SIG_HANDLE ? `https://twitter.com/${sig.SIG_HANDLE}` : null}
               className="sm:hover:bg-gray-hover transition duration-250 ease-in-out flex row items-center text-sm px-1 rounded-full sm:px-4 sm:rounded-3xl text-gray-secondary sm:bg-gray-wash overflow-hidden">
              {sig.SIG_ISVERIFIED && <div className="mr-2"><Checkmark filled/></div>}
              <span className="md:flex">
              {
                sig.SIG_ISVERIFIED ?
                  cleanHandle(sig.SIG_HANDLE, sig.SIG_ADDR, sig.SIG_ISVERIFIED) :
                  sig.SIG_SIG.slice(0, 10)
              }
            </span>
            </a>
          </div>
        </div>)}
        {!reachedEnd && <div className="font-mono w-full cursor-pointer" key="load_more" onClick={fetchMore}>
          <div className="space-x-0 flex py-4 md:space-x-4 sm:py-2 w-auto md:py-4 overflow-hidden">
            <a className="text-center w-full">Load more signatures</a>
          </div>
        </div>}
      </>}
    />
  );
}
