import { Link } from 'react-router-dom'
import Modal from '../../layouts/Modal'

const Message = ({ url }) => {
  return (
    <div className='pt-4 text-center opacity-30 font-garamond'>
      Transaction Submitted
      <div>
        View on&nbsp;
        <a href={url} className='text-lg no-underline cursor-pointer hover:text-black' target='_blank' rel='noreferrer'>
          Etherscan
        </a>
      </div>
    </div>
  )
}

const Share = ({ url, onClose, image }) => {
  return (
    <Modal>
      <div className='p-8 w-full h-min-content sm:w-96 my-auto rounded-lg shadow-xl bg-white font-garamond text-lg backdrop-blur-lg'>
        <div className='flex flex-row gap-2'>
          {
            image &&
              <div>
                <img src={image} alt='minted-nft' />
                <Message url={url} />
              </div>
          }
        </div>
        <div className='flex flex-row gap-2 pt-4 justify-center'>
          <div>
            <button className='py-2 px-6 border-slate-200 border-2 rounded-lg hover:border-slate-400 flex flex-row items-center gap-2' onClick={onClose}>
              Dismiss
            </button>
          </div>
          <Link to='/signatures' className='no-underline'>
            <button className='py-2 px-6 bg-slate-200 rounded-lg hover:bg-slate-300 flex flex-row items-center gap-2 border-2 border-slate-200' onClick={onClose}>
              View Soul Signs
            </button>
          </Link>

        </div>
      </div>
    </Modal>
  )
}
export default Share
