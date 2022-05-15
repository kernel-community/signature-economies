import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import sign_text from '../components/text'

// Redo this - prob means porting everything over to wagmi v0.3.5 anyway.
export function SignMessage() {
  const { data, error, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
    },
  })

  return (
    <div
      onClick={(event) => {
        event.preventDefault()
        signMessage({ sign_text })
      }}
    >
      {data && (
        <div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  )
}