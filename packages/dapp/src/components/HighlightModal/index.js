// not context aware
import Mintable from "./Mintable";
// import Footer from "./Footer";

const Modal = () => {
  return (
    <div className="flex justify-center md:p-8 w-full h-full md:h-auto md:w-min my-auto rounded-lg shadow-xl bg-white ">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="flex flex-col font-redaction justify-between">
          <Mintable text="hello" handleFinishedDrawing={() => console.log('handle')} />
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;