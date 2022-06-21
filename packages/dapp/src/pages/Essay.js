import FootNotes from '../components/Footnotes'
import EssayContent from '../components/Essay'
import FreeSign from '../components/FreeSign'
import HorizontalRule from '../components/common/HorizontalRule'
import Poem from '../components/Poem'
import Main from '../layouts/Main'
import HighlightModal from '../components/HighlightModal'

const Essay = () => {
  return (
    <Main>
      <div className='
        flex flex-col items-center mx-auto pb-32 bg-white
      '
      >
        <HighlightModal />
        {/* only the Essay component is highlight-mintable */}
        <EssayContent />
        <HorizontalRule />
        <Poem />
        <FreeSign />
        <FootNotes />
      </div>
    </Main>
  )
}

export default Essay
