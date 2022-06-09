import Footer from "../components/Footer";
import HorizontalRule from "../components/common/HorizontalRule";


const Main = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex-1">
        {children}
        <HorizontalRule />
      </div>
      <Footer />
    </div>
  )
}

export default Main;