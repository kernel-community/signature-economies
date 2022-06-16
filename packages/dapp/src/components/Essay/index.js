import HighlightPop from 'react-highlight-pop';
import Content from './Content';
import AnimateHighlightModal from '../HighlightModal/AnimateHighlightModal';
import MintPop from './MintPop';
import HeaderQuotes from "./HeaderQuotes";
import FooterQuotes from "./FooterQuotes";

const EssayContent = () => {
    return (
      <div>
        <AnimateHighlightModal />
          <HeaderQuotes />
          <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
            <span className='selection:bg-green-300 selection:text-green-900'>
            <Content />
            </span>
          </HighlightPop>
          <FooterQuotes />
      </div>
    )
}

export default EssayContent;