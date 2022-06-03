import HighlightPop from 'react-highlight-pop';
import Content from './Content';
import Hero from './Hero';
import AnimateHighlightModal from '../HighlightModal/AnimateHighlightModal';
import MintPop from './MintPop';

const Essay = () => {
    return (
      <div>
        <AnimateHighlightModal />
        <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
          <Hero />
          <Content />
        </HighlightPop>
      </div>
    )
}

export default Essay;