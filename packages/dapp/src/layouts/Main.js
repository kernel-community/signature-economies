import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HorizontalRule from '../components/common/HorizontalRule'
import MetaData from '../components/Metadata'

const Main = ({ children }) => {
  const { pathname } = useLocation()
  return (
    <>
      <MetaData />
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Header />
        <div className='flex-1 w-full mb-36'>
          <HorizontalRule />
          {children}
        </div>
        {pathname !== '/' && <Footer />}
      </div>
  )
}

export default Main
