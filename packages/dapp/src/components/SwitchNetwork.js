import { SwitchNetworkContext } from "../contexts/SwitchNetwork";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNetwork } from "wagmi";
import Spinner from "./common/Spinner";

const SwitchNetworkModal = () => {
  const { state } = useContext(SwitchNetworkContext);
  const {chains, switchNetwork, activeChain, isLoading, pendingChainId} = useNetwork();
  if (!state.modal) return;
  return (
    <AnimatePresence>
      <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, type: "tween" }}
      className="flex justify-center z-[100] fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen">
        <div className="md:p-8 w-full h-min-content md:w-80 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg">
          <div>
            Please switch to&nbsp;
          </div>
          <div className="flex flex-col gap-2">
          {chains.map((x) => (
            <button
              disabled={!switchNetwork || x.id === activeChain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
              className={`
                py-2 px-6 bg-slate-200 rounded-lg hover:bg-slate-300 flex flex-row items-center gap-2
              `}
            >
              <div className="grow">
                {x.name}
              </div>
              {
                isLoading && pendingChainId === x.id && (
                  <Spinner />
                )
              }
            </button>
          ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SwitchNetworkModal;
