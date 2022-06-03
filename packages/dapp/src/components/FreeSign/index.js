import ExecutionButton from "../common/ExecutionButton";
import SignatureList from "./SignatureList";
import { useConnect, useSignMessage } from "wagmi"
import ConnectButton from "../common/ConnectButton";
import signText from "../text";

const TEXT = `If you find this essay meaningful, you may mark our shared record by sending a signed message of the whole text. This can be done freely, as there are no costs to signing onchain messages. In addition, your signature will be stored on Arweave and become a permanent part of this document's history.`

const FreeSign = () => {
  const { activeConnector } = useConnect();
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    signMessage
  } = useSignMessage({ message: signText });
  console.log({
    data, isError, isLoading, isSuccess
  });
  const sign = async () => {
    // if signed, return
    // @todo need better check here ->
    // if sign already on arweave, return
    if (isSuccess) return;
    await signMessage();
    // upload signature to arweave
  }
  return (
  <>
    <div className="mx-96 bg-white rounded-md flex flex-col px-8 md:px-0 py-16 w-4/5 md:w-2/3 gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center border-2 ">
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
            text="Sign freely"
            loading={isLoading}
            disabled={isSuccess}
          />
      }
      <hr className="w-full"/>
      <SignatureList />
    </div>
    <div className="pt-16" />
    <hr className="w-2/3 mx-auto" />
  </>
  )
}

export default FreeSign;