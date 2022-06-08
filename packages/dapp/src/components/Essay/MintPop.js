import { useContext } from 'react';
import { HighlightContext } from '../../contexts/Highlight';

const MintPop = ({itemClass}) => {
  const { dispatch } = useContext(HighlightContext);
  return (
    <div>
      <span
        className={itemClass}
        onClick={() => dispatch({
          type:'highlight',
          payload: window.getSelection().toString()
        })}
        >
      🍀 Create Sign
      </span>
  </div>
  )
}

export default MintPop;