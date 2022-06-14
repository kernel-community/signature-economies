import ExecutionButton from "../common/ExecutionButton";
import SignatureList from "./SignatureList";
import { useConnect, useSigner } from "wagmi"
import ConnectButton from "../common/ConnectButton";
import signText from "../text";
import { useState, useEffect } from "react";
import { get } from "../../utils/signatures";
import { uploadToArweave } from "../../utils/arweave";

const TEXT = `If you find this essay meaningful, you may mark our shared record by sending a signed message of the whole text. This can be done freely, as there are no costs to signing onchain messages. In addition, your signature will be stored on Arweave and become a permanent part of this document's history.`

const FreeSign = () => {
  const { activeConnector } = useConnect();
  const { data: signer } = useSigner();
  const [isSigning, setIsSigning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // list: {id, date, data: {account, signature}}[]
  const [list, setList] = useState([]);

  const fetchSignatures = async () => {
    const signatures = await get();
    setList(signatures);
  }

  const sign = async () => {
    setIsSuccess(false);
    if (isSigning || isUploading) return;
    // if signed, return
    // @todo need better check here ->
    // if sign already on arweave, return
    setIsSigning(true);
    let signature;
    try {
      signature = await signer.signMessage(signText);
    } catch (err) {
      console.log(err);
      setIsSigning(false);
      return;
    }
    const account = await signer.getAddress();
    setIsSigning(false);
    // upload signature to arweave
    setIsUploading(true);
    const { arUrl: sigUrl } = (await uploadToArweave({
      data: JSON.stringify({
        signature,
        account
      }),
      contentType: 'text/plain',
      tags: [
        {
          key: "App-Name",
          value: "Kernel-Signature-Economies"
        }
      ]
    }));
    setIsUploading(false);
    setIsSuccess(true);
  }

  // fetch signatures after a successful signature submit
  useEffect(() => {
    if (isSuccess) fetchSignatures();
  }, [isSuccess]);

  // fetch signatures on mount
  useEffect(() => {
    fetchSignatures();
  }, []);
  return (
    <>
    <div id="free-sign" className="mx-96 bg-white rounded-md flex flex-col px-8 md:px-0 py-16 w-4/5 md:w-2/3 gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center border-2 ">
      <div className="px-2 md:px-16 text-center">
        {TEXT}
      </div>
      {
        !activeConnector
        ?
          <ConnectButton />
        :
          <ExecutionButton
            exec={sign}
            tween
            selectStyle="big"
            text={"Sign freely"}
            loading={isSigning || isUploading}
            disabled={isSigning || isUploading}
          />
      }
      <hr className="w-full"/>
      <SignatureList list={list} />
    </div>
    <div className="pt-16" />
    <hr className="w-2/3 mx-auto" />
    </>
  )
}

export default FreeSign;