import { useContext } from 'react'
import { HighlightContext } from '../../contexts/Highlight'
import { SliderContext } from '../../contexts/Slider'
import { Link } from 'react-router-dom'
import ExecutionButton from './ExecutionButton'

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

const Share = () => {
  const { state: highlightState } = useContext(HighlightContext)
  const { state: sliderState } = useContext(SliderContext)

  return (
    <div className='w-max p-12 flex flex-col items-center justify-center my-auto bg-white rounded-lg shadow-xl'>
      <div className='flex flex-row gap-2'>
        {
        highlightState.image &&
        <div>
          <img src={highlightState.image} alt='' style={{ width: '320px', height: '500px', maxWidth: '500px' }} />
          <Message url={highlightState.tx} />
        </div>
        }
        {
      sliderState.image &&
        <div>
          <img src={sliderState.image} alt='Front' style={{ width: '500px', height: '500px', maxWidth: '500px' }} />
          <Message url={sliderState.tx} />
        </div>
    }
      </div>
      <Link to='/signatures' className='no-underline pt-4'>
        <ExecutionButton
          exec={() => {}}
          selectStyle='big'
          text='View Soul Signs'
        />
      </Link>
    </div>
  )
}
export default Share
