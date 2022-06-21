import Modal from "../../layouts/Modal"
// import CloseButton from "./CloseButton"
import ExecutionButton from "./ExecutionButton"

const ErrorModal = ({ text, onClose }) => {
  return (
    <Modal bringToFront>
      <div className='p-8 w-full h-min-content sm:w-80 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg backdrop-blur-lg'>
        <div className="flex flex-col items-center gap-8">
          {/* <CloseButton exec={onClose} className="self-end" /> */}
          <div>
            {text}
          </div>
          <ExecutionButton
            selectStyle="basic"
            exec={onClose}
            text="Dismiss"
          />
        </div>

      </div>
    </Modal>
  )
}

export default ErrorModal
