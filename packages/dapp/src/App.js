import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Essay from './pages/Essay'
import SignedOn from './pages/SignedOn'
import SoulSigns from './pages/SoulSigns'
import SwitchNetworkModal from './components/SwitchNetwork'
import SliderModal from "./components/SliderModal"
import { SwitchNetworkProvider } from './contexts/SwitchNetwork'
import { HighlightProvider } from './contexts/Highlight'
import { SliderProvider } from './contexts/Slider'

import { LoadingProvider } from './hooks/useLoading'
import { ErrorProvider } from './hooks/useError'
import { ShareProvider } from './hooks/useShare'


const App = () => {
  return (
    <SwitchNetworkProvider>
      <LoadingProvider>
        <ErrorProvider>
            <HighlightProvider>
              <SliderProvider>
                <ShareProvider>
                  <div>
                    <SwitchNetworkModal />
                    <SliderModal />
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/essay' element={<Essay />} />
                      <Route path='/signatures' element={ <SoulSigns /> } />
                      <Route path='/signed/:address' element={<SignedOn />} />
                    </Routes>
                  </div>
                </ShareProvider>
              </SliderProvider>
            </HighlightProvider>
        </ErrorProvider>
      </LoadingProvider>
    </SwitchNetworkProvider>
  )
}

export default App
