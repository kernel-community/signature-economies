import { useState, useEffect } from 'react'
import { useAccount, useProvider } from 'wagmi'
import { lookUpEns } from '../utils/signatures'

export const useDisplayableAddress = (account = undefined) => {
  const { data, isError } = useAccount()

  const [toDisplay, setToDisplay] = useState(data?.address?.substring(0,8) + '...')
  const provider = useProvider()

  useEffect(() => {
    const fetch = async () => {
      let lookup;
      if (account) {
        lookup = await lookUpEns(account)
      } else {
        lookup = await lookUpEns(data?.address)
      }
      if (lookup?.length > 15) lookup = lookup.substring(0, 8) + '...'
      setToDisplay(lookup)
    }

    fetch()
  }, [data?.address, provider, account])

  if (isError) { console.log('there was an error in fetching accounts') }
  return toDisplay
}
