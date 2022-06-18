import { useState, useEffect } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { lookUpEns } from '../utils/signatures'

export const useDisplayableAddress = () => {
  const { data, isError } = useAccount()

  const [toDisplay, setToDisplay] = useState(data?.address?.substring(0,8) + '...')
  const provider = useProvider()

  useEffect(() => {
    const fetch = async () => {
      let lookup = await lookUpEns(data?.address, provider)
      if (lookup?.length > 15) lookup = lookup.substring(0, 8) + '...'
      setToDisplay(lookup)
    }

    fetch()
  }, [data?.address, provider])

  if (isError) { console.log('there was an error in fetching accounts') }
  return toDisplay
}
