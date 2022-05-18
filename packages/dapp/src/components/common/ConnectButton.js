import { useConnect } from "wagmi";
import { Connector } from "../../utils/connect";

const greenButtonStyle = `w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer`
const greenButtonDisabledStyle = `w-32 px-4 py-2 bg-gray-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-wait`

const ConnectButton = ({disabled = false}) => {
  const {
    connect,
    connectors,
    error,
  } = useConnect();
  return (
  <div
    className={disabled ? greenButtonDisabledStyle : greenButtonStyle}
    onClick={() => connect(connectors[Connector.INJECTED])}>
    {error && error.message && <div>Failed to connect</div>}
    Connect
  </div>
  )
}
export default ConnectButton;