import { useSigner } from "wagmi"
import { get, getSignatureCount, getSignOf } from "../utils/signatures"
import { useEffect, useState } from "react"
import signText from "../components/text"
import { uploadToArweave } from "../utils/arweave"
import useShare from "./useShare"

const useFreeSign = () => {
  const { data: signer } = useSigner()

  const [isUploading, setIsUploading] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {open: openShare} = useShare()

  const sign = async () => {
    setIsUploading(false)
    setIsSigning(false)
    setIsSuccess(false)
    setIsError(false)

    if (isSigning || isUploading) return

    setIsSigning(true)

    let signature
    try {
      signature = await signer.signMessage(signText)
    } catch (err) {
      console.log(err)
      setIsSigning(false)
      setIsError(true)
      return
    }
    const account = await signer.getAddress()

    setIsSigning(false)
    setIsUploading(true)
    try {
      await uploadToArweave({ signature, account })
    } catch (err) {
      console.log('error in uploading to arweave')
      console.log(err)
      setIsError(true)
      setIsSigning(false)
      setIsUploading(false)
      return
    }
    setIsUploading(false)
    setIsSigning(false)
    setIsSuccess(true)
    setIsError(false)
    openShare({
      msg: "Signature successfully submitted on Arweave. The transaction will take about 10 minutes to confirm and to be displayed on this page",
      shareOnTwitter: true
    })
  }

  return {
    sign, isSuccess, isError, isUploading, isSigning
  }

}

export const useSignatures = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchSignatures = async () => {
      const signatures = await get()
      setList(signatures)
    }
    fetchSignatures()
  }, [])

  return {list};
}

export const useAlreadySigned = () => {
  const { data: signer } = useSigner()
  const [isAlreadySigned, setIsAlreadySigned] = useState(false)

  useEffect(() => {
    const fetchAlreadySigned = async () => {
      const signatory = await signer.getAddress()
      setIsAlreadySigned(await getSignOf({ signatory }))
    }
    if (signer) fetchAlreadySigned()
  }, [signer])

  return { isAlreadySigned }
}

export const useSignatureCount = () => {
  const [sigCount, setSigCount] = useState(undefined)

  useEffect(() => {
    const f = async () => {
      setSigCount(await getSignatureCount())
    }
    f()
  }, [])

  return {sigCount}
}

export default useFreeSign
