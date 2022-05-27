import { SliderContext } from '../../contexts/Slider';
import { useContext } from 'react';
import LogSlider, {sliderCurve} from "./LogSlider"; 

const SliderInput = () => {
  const { state, dispatch }  = useContext(SliderContext);
  return (
    <div className="flex flex-row mt-12 md:mt-0 gap-x-12 md:flex-row md:ap-x-4 items-center">
    <div className='w-[200px] md:w-3/4'>
      <LogSlider 
      min={0.1}
      max={100}
      marks={[0.1, 1, 10, 100]}
      stepsInRange={100}
      onChange = {(value) => dispatch({type: 'slide', payload: sliderCurve(value).toFixed(1)})}
      />
    </div>
    <div className="text-xl md:text-3xl flex justify-center items-center font-redaction w-8 md:w-32">
       Ξ{state.input}
    </div>
  </div>
  )
}

export default SliderInput;