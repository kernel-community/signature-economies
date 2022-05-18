import FootNotes from '../components/footnotes';
import Essay from '../components/essay';
import { HighlightProvider } from '../contexts/Highlight';
import { SliderProvider } from '../contexts/Slider';
import Slider from '../components/SliderModal';

const Home = () => {
  return (
    <HighlightProvider>
      <SliderProvider>
        <Slider />
        <div className="
          mx-auto pb-32 bg-white selection:bg-green-300 selection:text-green-900
        ">
          <Essay />
          <FootNotes/>
        </div>
      </SliderProvider>
    </HighlightProvider>
  );
}

export default Home;
