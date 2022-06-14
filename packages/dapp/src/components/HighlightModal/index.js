import Mintable from "./Mintable";
import Footer from "./Footer";
import { HighlightContext } from "../../contexts/Highlight";
import { useContext } from 'react';
import Wait from "../common/Wait";
import Share from "../common/Share";


const Modal = () => {
  const { state } = useContext(HighlightContext);
  if (state.loading) {
    return <Wait />
  } else if (state.mint) {
    return <Share />
  } else return (
    <div className="flex justify-center md:p-8 w-full h-min-content md:w-min my-auto rounded-lg shadow-xl bg-white">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="flex flex-col font-redaction justify-between">
          <Mintable />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Modal;