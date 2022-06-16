import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from './Canvas'
import { HighlightContext } from '../../contexts/Highlight'
import { useContext } from 'react'

const Mintable = () => {
  const { state, dispatch } = useContext(HighlightContext)
  return (
    <div className='relative rounded-lg shadow-lg w-auto h-auto' id='nft' style={{ backgroundColor: 'black' }}>

      {/*
      this is a hack since P5 canvas was rendering to blank on each state update
      canvas will only be drawn each time state.image is undefined
    */}
      {
      (!state.image && state.text.length > 0) &&
        <ReactP5Wrapper
          sketch={Canvas}
          selectedText={state.text}
          handleFinishedDrawing={(img) => dispatch({ type: 'ready', payload: img })}
        />
    }
      {
      state.image &&
        <img src={state.image} alt='' style={{ maxHeight: '550px', maxWidth: '370px' }} />
    }
    </div>
  )
}

export default Mintable
