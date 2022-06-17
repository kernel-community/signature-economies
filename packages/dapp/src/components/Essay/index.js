import HighlightPop from 'react-highlight-pop'
import Content from './Content'
import AnimateHighlightModal from '../HighlightModal/AnimateHighlightModal'
import MintPop from './MintPop'
import HeaderQuotes from './HeaderQuotes'
import FooterQuotes from './FooterQuotes'
import { HighlightContext } from '../../contexts/Highlight'
import { useContext } from 'react'

const EssayContent = () => {
  const {state} = useContext(HighlightContext);
  return (
    <div>
      <AnimateHighlightModal />
      <HeaderQuotes />
      {
        !state.modal ?
          <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
            <Content />
          </HighlightPop>
            :
          <Content />
      }
      <FooterQuotes />
    </div>
  )
}

export default EssayContent
