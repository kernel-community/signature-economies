import FootNotes from '../components/footnotes';
import Essay from '../components/essay';
import { HighlightProvider } from '../contexts/Highlight';
import { SliderProvider } from '../contexts/Slider';
import Slider from '../components/SliderModal';
import FreeSign from '../components/freesign';

const Home = () => {
  return (
    <HighlightProvider>
      <SliderProvider>
        <Slider />
        <div className="
          flex flex-col items-center mx-auto pb-32 bg-white selection:bg-green-300 selection:text-green-900
        ">
          <Essay />
          <FreeSign/>
          <FootNotes/>
        </div>
      </SliderProvider>
    </HighlightProvider>
  );
}

export default Home;
