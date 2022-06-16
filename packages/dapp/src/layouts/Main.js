import Footer from '../components/Footer'
import Header from '../components/Header'
import HorizontalRule from '../components/common/HorizontalRule'
import { SwitchNetworkProvider } from '../contexts/SwitchNetwork'
import SwitchNetworkModal from '../components/SwitchNetwork'

const Main = ({ children }) => {
  return (
    <SwitchNetworkProvider>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Header />
        <SwitchNetworkModal />
        <div className='flex-1 w-full'>
          <HorizontalRule />
          {children}
          <HorizontalRule />
        </div>
        <Footer />
      </div>
    </SwitchNetworkProvider>
  )
}

export default Main
