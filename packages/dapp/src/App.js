import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Essay from './pages/Essay'
import SignedOn from './pages/SignedOn'
import SoulSigns from './pages/SoulSigns'
import SwitchNetworkModal from './components/SwitchNetwork'
import { SwitchNetworkProvider } from './contexts/SwitchNetwork'
import { PauseForLoadingProvider } from './contexts/PauseForLoading'
import PauseForLoadingModal from './components/PauseForLoadingModal'

const App = () => {
  return (
    <SwitchNetworkProvider>
      <PauseForLoadingProvider>
        <div>
          <SwitchNetworkModal />
          <PauseForLoadingModal />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/essay' element={<Essay />} />
            <Route path='/signatures' element={ <SoulSigns /> } />
            <Route path='/signed/:address' element={<SignedOn />} />
          </Routes>
        </div>
      </PauseForLoadingProvider>
    </SwitchNetworkProvider>
  )
}

export default App
