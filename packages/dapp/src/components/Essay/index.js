import HighlightPop from 'react-highlight-pop';
import Content from './Content';
import Hero from './Hero';
import AnimateHighlightModal from '../HighlightModal/AnimateHighlightModal';
import MintPop from './MintPop';
import HeaderPoem from "./HeaderPoem";
import FooterQuotes from "./FooterQuotes";

const Essay = () => {
    return (
      <div>
        <AnimateHighlightModal />
          <Hero />
          <HeaderPoem />
          <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
            <span className='selection:bg-green-300 selection:text-green-900'>
            <Content />
            </span>
          </HighlightPop>
          <FooterQuotes />
      </div>
    )
}

export default Essay;