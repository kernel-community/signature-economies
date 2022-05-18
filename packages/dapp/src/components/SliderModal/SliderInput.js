import { SliderContext } from '../../contexts/Slider';
import { useContext } from 'react';

const SliderInput = () => {
  const { state, dispatch }  = useContext(SliderContext);
  return (
    <div className="px-8 flex mt-12 md:mt-0 flex-row gap-x-4 items-center justify-between grow">
    <input
      type="range"
      defaultValue="0"
      min="0"
      max="50"
      step="1"
      className="w-full cursor-pointer"
      onChange={ (event) => dispatch({ type: 'slide', payload: event.target.value }) }
    />
    <div className="text-xl md:text-3xl flex justify-center items-center font-redaction w-12">
      ${state.input}
    </div>
  </div>
  )
}

export default SliderInput;