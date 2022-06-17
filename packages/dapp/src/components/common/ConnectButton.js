import { useConnect } from 'wagmi'
import { Connector } from '../../utils/connect'

const base = `
  w-24
  text-center
  text-green-300
  border-2
  border-transparent
  rounded-md
  py-1

  sm:px-4 sm:py-2
  sm:shadow sm:shadow-green-300
  sm:transition-all

  hover:shadow-md
  hover:shadow-green-500
  hover:text-green-50
`

const greenButtonStyle = `
  ${base} bg-green-600 cursor-pointer
`
const greenButtonDisabledStyle = `
  ${base} bg-gray-600  cursor-wait
`

const ConnectButton = ({ disabled = false }) => {
  const {
    connect,
    connectors,
    error
  } = useConnect()
  return (
    <div className='flex flex-col gap-1'>
      <div
        className={disabled ? greenButtonDisabledStyle : greenButtonStyle}
        onClick={() => connect(connectors[Connector.INJECTED])}
      >
        Connect
      </div>
      {
      error && error.message &&
        <div className='text-red-400 text-sm sm:text-base'>Failed to connect</div>
    }
    </div>
  )
}
export default ConnectButton
