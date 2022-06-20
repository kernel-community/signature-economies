import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Essay from './pages/Essay'
import SignedOn from './pages/SignedOn'
import SoulSigns from './pages/SoulSigns'
import SwitchNetworkModal from './components/SwitchNetwork'
import Slider from './components/SliderModal'

import { SwitchNetworkProvider } from './contexts/SwitchNetwork'
import { HighlightProvider } from './contexts/Highlight'
import { SliderProvider } from './contexts/Slider'

import { PauseForLoadingProvider } from './hooks/useLoading'
import { ErrorProvider } from './hooks/useError'


const App = () => {
  return (
    <SwitchNetworkProvider>
      <PauseForLoadingProvider>
        <ErrorProvider>
          <HighlightProvider>
            <SliderProvider>
              <div>
                <SwitchNetworkModal />
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
        </ErrorProvider>
      </PauseForLoadingProvider>
    </SwitchNetworkProvider>
  )
}

export default App
