import Mintable from "./Mintable";
import Footer from "./Footer";
import MintModal from "../MintModal";

const Modal = () => {
  return (
    <div className="flex justify-center md:p-8 w-full h-full md:h-auto md:w-min my-auto rounded-lg shadow-xl bg-white ">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="flex flex-col font-redaction justify-between">

          {/* The following components are commented out to view the MintModal during development*/}

          {/* <Mintable />
          <Footer /> */}

          <MintModal />

        </div>
      </div>
    </div>
  );
}

export default Modal;