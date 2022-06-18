import { SliderContext } from '../../contexts/Slider'
import { useContext } from 'react'
import LogSlider, { sliderCurve } from './LogSlider'

const SliderInput = () => {
  const { state, dispatch } = useContext(SliderContext)
  return (
    <div className='flex flex-row items-center grow sm:gap-6 gap-4 w-full justify-between'>
      <div className='grow'>
        <LogSlider
          min={0.1}
          max={100}
          marks={[0.1, 1, 10, 100]}
          stepsInRange={100}
          onChange={(value) => dispatch({ type: 'slide', payload: sliderCurve(value).toFixed(1) })}
        />
      </div>
      <div className='text-2xl flex sm:justify-center sm:items-center font-redaction sm:w-[100px] w-[60px]'>
        Ξ{state.input}
      </div>
    </div>
  )
}

export default SliderInput
