import { SliderContext } from '../contexts/Slider'
import { useContext } from 'react'

const Footer = () => {
  const slider = useContext(SliderContext)
  return (
    <>
      <div className='
        flex
        flex-col
        text-gray-500
        w-full
        justify-center
        sm:py-6
        py-6
        text-base
        sm:text-2xl
        font-redaction
        fixed bottom-0
        bg-gray-200
        items-center
        gap-2 z-10
      '
      >
        <div
          className='flex flex-row gap-2 items-center'
        >
          <div
            className='cursor-pointer text-gray-800 hover:underline border-b-2'
            onClick={() => window.open('/essay#free-sign', '_self')}
          >
            sign freely
          </div>
          <div>
            /
          </div>
          <div
            className='cursor-pointer text-gray-800 hover:underline border-b-2'
            onClick={() => slider.dispatch({ type: 'open' })}
          >
            mint a seal
          </div>
        </div>
      </div>
    </>

  )
}

export default Footer
