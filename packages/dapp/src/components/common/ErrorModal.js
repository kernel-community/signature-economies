import Modal from '../../layouts/Modal'
import ExecutionButton from './ExecutionButton'

const ErrorModal = ({ text, onClose }) => {
  return (
    <Modal bringToFront>
      <div className='p-8 w-full h-min-content sm:w-80 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg backdrop-blur-lg text-center'>
        <div className='flex flex-col items-center gap-8'>
          <div>
            {text}
          </div>
          <ExecutionButton
            selectStyle='basic'
            exec={onClose}
            text='Dismiss'
          />
        </div>

      </div>
    </Modal>
  )
}

export default ErrorModal
