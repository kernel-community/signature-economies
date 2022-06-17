import FootNotes from '../components/Footnotes'
import EssayContent from '../components/Essay'
import { HighlightProvider } from '../contexts/Highlight'
import { SliderProvider } from '../contexts/Slider'
import Slider from '../components/SliderModal'
import FreeSign from '../components/FreeSign'
import ExecutionButton from '../components/common/ExecutionButton'
import HorizontalRule from '../components/common/HorizontalRule'
import Poem from '../components/Poem'
import Main from '../layouts/Main'

const Essay = () => {
  return (
    <Main>
      <HighlightProvider>
        <SliderProvider>
          <Slider />
          <div className='
            flex flex-col items-center mx-auto pb-32 bg-white
          '
          >
            {/* only the Essay component is highlight-mintable */}
            <EssayContent />
            <ExecutionButton
              exec={() => window.open("#free-sign", "_self")}
              tween
              selectStyle='big'
              text='Sign freely'
              fixed='bottom-28 md:right-8 right-1/2 -mr-24 md:-mr-0'
            />
            <HorizontalRule />
            <Poem />
            <FreeSign />
            <FootNotes />
          </div>
        </SliderProvider>
      </HighlightProvider>
    </Main>
  )
}

export default Essay
