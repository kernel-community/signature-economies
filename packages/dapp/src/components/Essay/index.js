import HighlightPop from 'react-highlight-pop'
import Content from './Content'
import MintPop from './MintPop'
import HeaderQuotes from './HeaderQuotes'
import FooterQuotes from './FooterQuotes'

const EssayContent = () => {
  return (
    <div>
      <HeaderQuotes />
      <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
        <Content />
      </HighlightPop>
      <FooterQuotes />
    </div>
  )
}

export default EssayContent
