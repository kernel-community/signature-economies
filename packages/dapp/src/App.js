import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Essay from './pages/Essay'
import SignedOn from './pages/SignedOn'
import SoulSigns from './pages/SoulSigns'
import SwitchNetworkModal from './components/SwitchNetwork'
import PauseForLoadingModal from './components/PauseForLoadingModal'
import Slider from './components/SliderModal'
import { SwitchNetworkProvider } from './contexts/SwitchNetwork'
import { PauseForLoadingProvider } from './contexts/PauseForLoading'
import { HighlightProvider } from './contexts/Highlight'
import { SliderProvider } from './contexts/Slider'

const App = () => {
  return (
    <SwitchNetworkProvider>
      <PauseForLoadingProvider>
        <HighlightProvider>
          <SliderProvider>
            <div>
              <SwitchNetworkModal />
              <PauseForLoadingModal />
              <Slider />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/essay' element={<Essay />} />
                <Route path='/signatures' element={ <SoulSigns /> } />
                <Route path='/signed/:address' element={<SignedOn />} />
              </Routes>
            </div>
          </SliderProvider>
        </HighlightProvider>
      </PauseForLoadingProvider>
    </SwitchNetworkProvider>
  )
}

export default App
