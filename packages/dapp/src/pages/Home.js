import FootNotes from '../components/Footnotes';
import Essay from '../components/Essay';
import { HighlightProvider } from '../contexts/Highlight';
import { SliderProvider } from '../contexts/Slider';
import Slider from '../components/SliderModal';
import FreeSign from '../components/FreeSign';
import HorizontalRule from '../components/common/HorizontalRule';
import Poem from '../components/Poem';

const Home = () => {
  return (
    <HighlightProvider>
      <SliderProvider>
        <Slider />
        <div className="
          flex flex-col items-center mx-auto pb-32 bg-white selection:bg-green-300 selection:text-green-900
        ">
          {/* only the Essay component is highlight-mintable */}
          <Essay />

          <HorizontalRule />
          <Poem />
          <FreeSign />
          <FootNotes />
        </div>
      </SliderProvider>
    </HighlightProvider>
  );
}

export default Home;
