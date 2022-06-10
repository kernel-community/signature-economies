import Footer from "../components/Footer";
import Header from "../components/Header";
import HorizontalRule from "../components/common/HorizontalRule";


const Main = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="flex-1">
      <HorizontalRule />
        {children}
      <HorizontalRule />
      </div>
      <Footer />
    </div>
  )
}

export default Main;